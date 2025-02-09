from django.contrib import admin
from django.urls import path, include
from Chromesthesia.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('wel/', ReactView.as_view(), name="something"),
]