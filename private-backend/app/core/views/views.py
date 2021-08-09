from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.parsers import MultiPartParser, FormParser

from core.models import Snapshot
from core.services import snapshot_service

# Create your views here.
class UserView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = []
        for user in User.objects.all():
            usernames.append({"user": user.username, "email": user.email})
        
        return Response(data={"data": usernames})

class SnapshotView(APIView):
    authentication_classes = []
    permission_classes = []
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request, format=None):
        """
        Return a list of all snapshot.
        """
        snapshots = []
        for snapshot in Snapshot.objects.all():
            item = {}
            item['id'] = snapshot.id
            item['theme'] = snapshot.theme
            item['name'] = snapshot.name
            #item['file'] = snapshot.snapshot
            snapshots.append(item)
            print("snapshot!")
        
        return Response(data={"data": snapshots})

    def post(self, request, format=None):
        """
        Create a new snapshot.
        """
        print(request.data)
        result = snapshot_service.create_snapshot(request.data['name'], request.data['theme'], request.data['image'])
        return Response(data={"result": "ok"})

class SnapshotDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return Snapshot.objects.get(pk=pk)
        except Snapshot.DoesNotExist:
            raise Http404
