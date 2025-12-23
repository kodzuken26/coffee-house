from django.contrib import admin
from .models import Drink, UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'nickname', 'phone', 'gender', 'role')
    search_fields = ('user__username', 'user__email', 'nickname', 'phone')

@admin.register(Drink)
class DrinkAdmin(admin.ModelAdmin):
    list_display = ('name', 'price')
    search_fields = ('name',)