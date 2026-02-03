from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls')),
    path('api/auth/', include('authentication.urls')),
    path('api/cart/', include('cart.urls')),
    
]
