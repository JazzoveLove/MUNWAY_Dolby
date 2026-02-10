from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from shop.models import Product
from .models import Cart, CartItem
from .serializers import CartSerializer
from django.shortcuts import get_object_or_404


class AddToCartView(APIView):

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
  def get(self, request):
        # 1. Sprawdzamy, czy użytkownik ma koszyk
        try:
            cart = Cart.objects.get(user=request.user)
            # 2. Pobieramy elementy i sumujemy ilość
            items = CartItem.objects.filter(cart=cart)
            total_qty = sum(item.quantity for item in items)
            return Response({"total_items": total_qty}, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            # 3. Jeśli nie ma koszyka, zwracamy 0
            return Response({"total_items": 0}, status=status.HTTP_200_OK)
        
class CartDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            cartView = Cart.objects.get(user = request.user)
            serializer = CartSerializer(cartView)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Cart.DoesNotExist:
            return Response({"items": [], "total_price":0}, status=status.HTTP_200_OK)
        
class CartItemDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,pk):
            item = get_object_or_404(CartItem, id=pk, cart__user=request.user)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        