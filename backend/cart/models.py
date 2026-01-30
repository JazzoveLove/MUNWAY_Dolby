from django.db import models
from shop.models import Product
from django.contrib.auth.models import User

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name='items')
    product = models.ForeignKey (Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    reserved_until = models.DateTimeField(null=True,blank=True)
