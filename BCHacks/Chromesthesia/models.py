from django.db import models

class gen(models.Model):
  image = models.ImageField()
  description = models.CharField(max_length=10000)

class test(models.Model):
  name = models.CharField(max_length=30)
  detail = models.CharField(max_length=500)