from rest_framework import serializers
from .models import test

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = test
        fields = ['name', 'detail']