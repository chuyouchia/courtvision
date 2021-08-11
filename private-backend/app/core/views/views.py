from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from django.http import Http404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser

from core.models import Snapshot
from core.services import snapshot_service, youtube_dl_service
from core.serializers import SnapshotSerializer

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
            item['created_at'] = snapshot.created_at
            item['updated_at'] = snapshot.updated_at
            item['image_url'] = snapshot.snapshot.url

            snapshots.append(item)

        return Response(data={"data": snapshots})

    def post(self, request, format=None):
        """
        Create a new snapshot.
        """
        snapshot_serializer = SnapshotSerializer(data=request.data)
        if snapshot_serializer.is_valid():
                snapshot_serializer.save()
                return Response(snapshot_serializer.data, status=status.HTTP_201_CREATED)
        else:
                return Response(snapshot_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VideoDetailView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None):
        url = request.data['url']
        result = youtube_dl_service.download_video_from_url(url, '/vol/web/videos')
        data = {
            "data": "downloaded {url}".format(url=url),
            "location" : result,
            }
        return Response(data=data)

class BaseSnapshotView(APIView):
    authentication_classes = []
    permission_classes = []
    """
    Retrieve, create a base screenshot
    """
    def post(self, request, format=None):
        """
        Return a video frame.
        """
        print(request)
        movie = request.data['location']
        fixed_imgdir = '/vol/web/media'
        times = request.data['time']
        frame_name = request.data['name']

        img_path = youtube_dl_service.extract_frame(movie,frame_name, times,fixed_imgdir)
        data = {
            "image_location" : img_path,
            }
        
        return Response(data=data)
