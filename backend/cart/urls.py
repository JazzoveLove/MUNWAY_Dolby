from django.urls import path
from .views import AddToCartView, CartDetailView, CartItemDeleteView

urlpatterns = [
    # Ścieżka będzie wyglądać tak: /api/cart/add/
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('detail/',CartDetailView.as_view(),name='cart-detail'),
    path('items/<int:pk>/',CartItemDeleteView.as_view(),name='cart-item-delete')

]