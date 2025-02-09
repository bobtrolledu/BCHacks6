from django.forms import ModelForm
from Chromesthesia.models import test


class UploadImageForm(ModelForm):
    class Meta:
        model = test
        fields = ['image']