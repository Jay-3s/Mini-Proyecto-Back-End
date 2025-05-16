from .models import *
from rest_framework import serializers

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        
    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor que cero.")
        return value
    
    def validate_stock(self, value):    
        if value < 0:
            raise serializers.ValidationError("El stock no puede ser negativo.")
        return value

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'
    
    def validate_cantidad(self, value):   
        if value < 0:
            raise serializers.ValidationError("La cantidad no puede ser negativa.")
        return value
    
    def validate_producto(self, value):
        if not Producto.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("El producto no existe.")
        return value