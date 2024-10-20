from django.contrib import admin
from .models import Menu, Category, Food

admin.site.register(Food)
admin.site.register(Category)
admin.site.register(Menu)
