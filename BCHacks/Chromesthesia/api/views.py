from rest_framework.viewsets import ModelViewSet
from Chromesthesia.models import slate
from .serializer import PostSerializer

class slateViewSet(ModelViewSet):
    queryset = slate.objects.all()
    serializer_class = PostSerializer