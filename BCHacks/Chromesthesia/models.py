from django.db import models

class slate(models.Model):
    image = models.ImageField(upload_to="images/")
    description = models.CharField(max_length=10000)

    def __str__(self):
        return f"Slate: {self.description[:50]}..."  # Show first 50 chars

class audiofile(models.Model):
    audio = models.FileField(upload_to="audio/")

    def __str__(self):
        return f"AudioFile: {self.audio.name}"
