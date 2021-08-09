from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import authentication, permissions


# Create your views here.
class UserView(APIView):
    """
    A simple API for listing or retrieving users.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames)