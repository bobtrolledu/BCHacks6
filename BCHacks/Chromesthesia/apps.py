from django.apps import AppConfig


class ChromesthesiaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Chromesthesia'

    def ready(self):
        import Chromesthesia.signals
