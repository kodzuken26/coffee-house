from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import GenericAPIView
from .models import Drink, UserProfile
from .serializers import (
    DrinkSerializer, 
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserSerializer
)

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser

def home_view(request):
    return HttpResponse("""
        <h1>Добро пожаловать в Coffee API!</h1>
        <p>Доступные эндпоинты:</p>
        <ul>
            <li><a href="/api/">API (/api/)</a></li>
            <li><a href="/admin/">Админка (/admin/)</a></li>
            <li><a href="/api-auth/login/">Авторизация (/api-auth/login/)</a></li>
        </ul>
    """)

class DrinkViewSet(viewsets.ModelViewSet):
    serializer_class = DrinkSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Drink.objects.all().order_by('name')
    
    def perform_destroy(self, instance: Drink):
        instance.delete()

    def perform_create(self, serializer):
        serializer.save()

class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            
            # Получаем профиль пользователя
            profile = UserProfile.objects.get(user=user)
            
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'nickname': profile.nickname,
                'phone': profile.phone,
                'gender': profile.gender,
                'role': profile.role,
                'tokens': {
                    'refresh': str(token),
                    'access': str(token.access_token)
                }
            }
            return Response(user_data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.validated_data
            profile = UserProfile.objects.get(user=user)
            token = RefreshToken.for_user(user)
            
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'nickname': profile.nickname,
                'phone': profile.phone,
                'gender': profile.gender,
                'role': profile.role,
                'tokens': {
                    'refresh': str(token),
                    'access': str(token.access_token)
                }
            }
            return Response(user_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogoutAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"error": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {"message": "Successfully logged out"},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        profile = UserProfile.objects.get(user=user)
        
        user_data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'nickname': profile.nickname,
            'phone': profile.phone,
            'gender': profile.gender,
            'role': profile.role,
        }
        return Response(user_data)
    
class UploadImageView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)
    
    def post(self, request):
        try:
            profile = UserProfile.objects.get(user=request.user)
            image_type = request.data.get('type')  # 'avatar' или 'banner'
            file = request.FILES.get('image')
            
            if not file:
                return Response({"error": "Файл не выбран"}, status=400)
            
            # Сохраняем файл
            if image_type == 'avatar':
                profile.avatar = file
            elif image_type == 'banner':
                profile.banner = file
            else:
                return Response({"error": "Неверный тип"}, status=400)
            
            profile.save()
            
            return Response({
                "message": "Файл загружен",
                "avatar_url": profile.avatar.url if profile.avatar else '/media/avatars/default.jpg',
                "banner_url": profile.banner.url if profile.banner else '/media/banners/default.jpg'
            })
            
        except Exception as e:
            return Response({"error": str(e)}, status=500)