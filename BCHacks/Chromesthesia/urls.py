from django.urls import path
from django.urls.conf import include

from . import views

urlpatterns = [
     path('', views.index, name='index'),
     path('api/', views.PostView.as_view(), name= 'posts_list'),
     path('api/', include('api.urls')),]
