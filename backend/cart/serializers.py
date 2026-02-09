from rest_framework import serializers
from .models import Cart, CartItem
from shop.serializers import ProductSerializer 

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    sub_total = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity',  'sub_total']

    def get_sub_total(self, obj):
        
        return obj.quantity * obj.product.price

class CartSerializer(serializers.ModelSerializer):
    
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price', 'created_at']

    def get_total_price(self, obj):
    
        total = sum(item.quantity * item.product.price for item in obj.items.all())
        return total