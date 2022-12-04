"""
This files contains design patterns classes
"""

from django.db import models

# Singleton pattern 
class SingletonModel(models.Model):
    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)
    
    class Meta:
        abstract = True
