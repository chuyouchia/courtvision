from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
        PermissionsMixin
# Create your models here.

class UserManager(BaseUserManager):

    def create_user(self, email, password=None):
        """Creates and saves a new user"""
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Uses the inbuilt base django features and customises it"""