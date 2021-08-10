from django.contrib.admin.sites import DefaultAdminSite
from django.db import models
# Create your models here.
from datetime import datetime

def upload_to(instance, filename):
    # file will be uploaded to MEDIA_ROOT/snapshot/<filename>
    return 'snapshot/{filename}'.format(filename=filename)


class TimeStampedModel(models.Model):
    #Basic requirement for all databases
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class Snapshot(TimeStampedModel):
    name = models.CharField(max_length=50)
    theme = models.CharField(max_length=50, default="None of the above")
    snapshot = models.ImageField(upload_to=upload_to, default='snapshot/test.png')
