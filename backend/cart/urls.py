from django.urls import path
from .views import AddToCartView

urlpatterns = [
    # Ścieżka będzie wyglądać tak: /api/cart/add/
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
]