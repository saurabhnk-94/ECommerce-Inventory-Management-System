from rest_framework import serializers
from .models import Brand, Category, Product, Specification


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category', 'get_breadcrumbs']


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    category= CategorySerializer()
    class Meta:
        model= Product
        fields = ['id', 'name', 'brand', 'category']

class SpecificationSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = Specification
        fields = ['id', 'key', 'value', 'unit', 'product']