from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Drink
from .serializers import  DrinkSerializer
from django.http import HttpResponse
from rest_framework.permissions import AllowAny

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

def getDrinks(request):
    return Drink.objects.all().order_by('name')

class DrinkViewSet(viewsets.ModelViewSet):
    serializer_class = DrinkSerializer
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Возвращаем все напитки, отсортированные по названию
        # (без фильтрации по пользователю, так как его нет в модели)
        return Drink.objects.all().order_by('name')
    
    def perform_destroy(self, instance: Drink):
        # Выполняем стандартное удаление через ORM
        instance.delete()


    def perform_create(self, serializer):
        # Сохраняем напиток (без привязки к пользователю)
        serializer.save()


        
