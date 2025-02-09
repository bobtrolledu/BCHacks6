from rest_framework.serializers import ModelSerializer
from ..models import slate

class PostSerializer(ModelSerializer):
    class Meta:
        model = slate
        fields = '__all__'