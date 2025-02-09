import serializers
from rest_framework.serializers import ModelSerializer

from ..models import *


class PostSerializer(ModelSerializer):
    class Meta:
        model = slate
        fields = '__all__'

class audioSerializer(ModelSerializer):
    class Meta:
        model = audiofile
        fields = '__all__'

