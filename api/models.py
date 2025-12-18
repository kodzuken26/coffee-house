from django.db import models

class Drink(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Название')
    price = models.DecimalField(default=0, max_digits=8, decimal_places=0, verbose_name='Цена')
    image = models.URLField( verbose_name='Картинка')
    ingredients = models.TextField(blank=True, null=True, verbose_name='Состав')

    def __str__(self):
        return self.name
