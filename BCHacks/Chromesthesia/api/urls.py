from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register ViewSets
slate_router = DefaultRouter()
slate_router.register(r'slates', slateViewSet, basename="slate")  # Added basename
slate_router.register(r'audiofile', audioViewSet, basename="audiofile")  # Added basename

urlpatterns = [
    path('api/', PostView.as_view(), name= 'posts_list'),
]