from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

from Chromesthesia.api.views import PostView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/audiofile/', PostView.as_view(), name='audiofile'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

