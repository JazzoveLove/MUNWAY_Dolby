from django.db import models
from shop.models import Product
from django.contrib.auth.models import User

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) 
    
    @property
    def total_price(self):
        # Pobieramy wszystkie elementy (VS Code może to podkreślać, ale to zadziała)
        cart_items = self.items.all()
        
        # Liczymy sumę: (ilość * cena) dla każdego elementu
        total = sum(item.quantity * item.product.price for item in cart_items)
        
        return total

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    