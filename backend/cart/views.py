from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from shop.models import Product
from .models import Cart, CartItem


class AddToCartView(APIView):
  authentication_classes = [SessionAuthentication]
  permission_classes = [IsAuthenticated]  
  def post(self, request):
        prod_id = request.data.get('product_id')

        try:
            product = Product.objects.get(id=prod_id)
        except Product.DoesNotExist:
            return Response({"error": "nie ma takiego produktu"}, status=status.HTTP_404_NOT_FOUND)
        
        user_cart, created = Cart.objects.get_or_create(user=request.user)

        item, created = CartItem.objects.get_or_create(cart=user_cart, product=product)

        if not created:
            if item.quantity + 1 > product.stock:
                return Response({"error": "Limit osiągnięty"}, status=status.HTTP_400_BAD_REQUEST)
            item.quantity += 1
            item.save()
        else:
            if product.stock < 1:
                item.delete()
                return Response({"error": "Produkt niedostępny"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            "message": "Produkt dodany do koszyka",
            "new_quantity": item.quantity,
            "cart_id": user_cart.pk
        }, status=status.HTTP_200_OK)