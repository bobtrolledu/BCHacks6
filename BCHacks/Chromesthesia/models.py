from django.db import models

class slate(models.Model):
  image = models.ImageField()
  description = models.CharField(max_length=10000)

  def __str__(self):
    return f"Post: {self.name}"