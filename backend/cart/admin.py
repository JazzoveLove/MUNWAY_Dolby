from django.contrib import admin
from .models import Cart,CartItem
from .models import Product

admin.site.register(Cart)
admin.site.register(CartItem)

