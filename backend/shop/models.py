from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=200)           # Nazwa produktu
    price = models.DecimalField(max_digits=10, decimal_places=2) # Cena
    description = models.TextField(blank=True)        # Opis
    stock = models.IntegerField(default=0)            # Stan magazynowy
    created_at = models.DateTimeField(auto_now_add=True) # Data dodania

    def __str__(self):
        return self.name