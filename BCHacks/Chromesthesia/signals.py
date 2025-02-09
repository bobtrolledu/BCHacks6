from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import audiofile
from .processing import process_audio  # Import the function

@receiver(post_save, sender=audiofile)
def process_uploaded_audio(sender, instance, created, **kwargs):
    if created:  # Only process new uploads
        process_audio(instance.audio.path)  # Run image generation
