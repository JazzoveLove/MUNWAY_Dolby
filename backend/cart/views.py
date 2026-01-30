from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from shop.serializers import ProductSerializer
from cart.serializers import CartSerializer, CartItemSerializer
from shop.models import Product
from .models import Cart, CartItem
from django.utils import timezone
from datetime import timedelta

class AddToCartView(APIView):

    def post(self,request):
    
        prod_id = request.data.get('product_id')

        try:
            product = Product.objects.get(id = prod_id)
        except Product.DoesNotExist:
                return Response({"error": "nie ma takiego produktu"}, status= status.HTTP_404_NOT_FOUND)
        cart,created = Cart.objects.get_or_create(user=request.user)
           
           