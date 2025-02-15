# Generated by Django 5.2a1 on 2025-02-09 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Chromesthesia', '0008_audiofile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiofile',
            name='audio',
            field=models.FileField(upload_to='audio/'),
        ),
        migrations.AlterField(
            model_name='slate',
            name='image',
            field=models.ImageField(upload_to='images/'),
        ),
    ]
