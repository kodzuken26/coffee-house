from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('woman', 'Женский'),
        ('man', 'Мужской'),
        ('none-gender', 'Не указан'),
    ]
    ROLE_CHOICES = [
        ('standart', 'Стандарт'),
        ('blocked', 'Заблокирован'),
        ('junior-admin', 'Младший администратор'),
        ('adult-admin', 'Старший администратор'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    patronymic = models.CharField(max_length=50, blank=True, null=True, verbose_name='Отчество')
    nickname = models.CharField(max_length=50, unique=True, verbose_name='Никнейм')
    phone = models.CharField(max_length=20, unique=True, verbose_name='Телефон')
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, verbose_name='Пол')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='standart', verbose_name='Роль')
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    banner = models.ImageField(upload_to='banners/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} ({self.user.username})"


class Drink(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    price = models.DecimalField(default=0, max_digits=8, decimal_places=0, verbose_name='Цена')
    image = models.URLField(verbose_name='Картинка')
    ingredients = models.TextField(blank=True, null=True, verbose_name='Состав')

    def __str__(self):
        return self.name