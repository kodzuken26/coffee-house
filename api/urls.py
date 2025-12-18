from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import DrinkViewSet
from rest_framework.authtoken.views import obtain_auth_token



router = DefaultRouter()
router.register('drinks', DrinkViewSet, basename='drink')
# router.register('delete-drink', DrinkDelete, basename='drink-delete')

urlpatterns = [
    path('', include(router.urls)),
    path('drinks/', views.getDrinks, name=''),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]