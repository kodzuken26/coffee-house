from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import Drink, UserProfile

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ['id', 'name', 'image', 'price', 'ingredients']

class UserProfileSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    banner_url = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ('patronymic', 'nickname', 'phone', 'gender', 'role', 'avatar_url', 'banner_url', 'updated_at')

    def get_avatar_url(self, obj):
        if obj.avatar:
            return obj.avatar.url
        return '/media/avatars/default.jpg'
    
    def get_banner_url(self, obj):
        if obj.banner:
            return obj.banner.url
        return '/media/banners/default.jpg'

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile')
        read_only_fields = ('id',)

class UserRegistrationSerializer(serializers.Serializer):
    # Основные поля пользователя
    username = serializers.CharField(required=True, max_length=150)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    # Персональные данные (правильные имена полей для Django User)
    first_name = serializers.CharField(required=True, max_length=30)
    last_name = serializers.CharField(required=True, max_length=150)
    
    # Дополнительные поля профиля
    patronymic = serializers.CharField(max_length=50, required=False, allow_blank=True, allow_null=True)
    nickname = serializers.CharField(max_length=50, required=True)
    phone = serializers.CharField(max_length=20, required=True)
    gender = serializers.ChoiceField(
        choices=[('woman', 'Женский'), ('man', 'Мужской'), ('none-gender', 'Не указан')], 
        required=True
    )

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают"})
        
        # Проверяем уникальность username и email
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "Пользователь с таким именем пользователя уже существует"})
        
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Пользователь с таким email уже существует"})
        
        # Проверяем уникальность nickname и phone
        if UserProfile.objects.filter(nickname=attrs['nickname']).exists():
            raise serializers.ValidationError({"nickname": "Пользователь с таким никнеймом уже существует"})
        
        if UserProfile.objects.filter(phone=attrs['phone']).exists():
            raise serializers.ValidationError({"phone": "Пользователь с таким телефоном уже существует"})
        
        return attrs
    
    def create(self, validated_data):
        # Извлекаем данные для профиля
        profile_data = {
            'patronymic': validated_data.pop('patronymic', ''),
            'nickname': validated_data.pop('nickname'),
            'phone': validated_data.pop('phone'),
            'gender': validated_data.pop('gender'),
        }
        
        # Удаляем password2
        validated_data.pop('password2')
        
        # Извлекаем пароль
        password = validated_data.pop('password')
        
        # Создаем пользователя
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        
        # Создаем профиль пользователя
        UserProfile.objects.create(user=user, **profile_data)
        
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Неверное имя пользователя или пароль")