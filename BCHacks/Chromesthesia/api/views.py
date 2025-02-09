from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
from Chromesthesia.models import audiofile, slate
from .serializer import PostSerializer, audioSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class slateViewSet(ModelViewSet):
    queryset = slate.objects.all()
    serializer_class = PostSerializer


class audioViewSet(ModelViewSet):
    queryset = audiofile.objects.all()
    serializer_class = audioSerializer
    parser_classes = (MultiPartParser, FormParser)  # ✅ Added for file uploads

@api_view(['GET'])
def latest_audio(request):
    latest_audio = audiofile.objects.order_by('-id').first()  # Get most recent audio
    if latest_audio:
        return Response(audioSerializer(latest_audio).data)
    return Response({"error": "No audio files found"}, status=404)


class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        details = [{"name": detail.audio.name} for detail in audiofile.objects.all()]
        return Response(details)

    def post(self, request):
        serializer = audioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
