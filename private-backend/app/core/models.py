from django.db import models

# Create your models here.

def upload_to(instance, filename):
    # file will be uploaded to MEDIA_ROOT/snapshot/<filename>
    return 'snapshot/{filename}'.format(filename=filename)


class TimeStampMixin:
    #Basic requirement for all databases
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Snapshot(models.Model, TimeStampMixin):
    name = models.CharField(max_length=50)
    theme = models.CharField(max_length=50, default="None of the above")
    snapshot = models.ImageField(upload_to='snapshot', default= 'snapshot/test.png')

