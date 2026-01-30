from django.urls import path
from .views import ProductList, ProductById


urlpatterns = [
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductById.as_view(), name='product-by-id')
]