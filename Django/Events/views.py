from django.shortcuts import render
from .models import Event, Participant, FollowsEvent
from .serializers import EventSerializer,ParticipantSerializer, FollowsEventSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event,Participant
from rest_framework import status, permissions
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class EventsList(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
        
    def get(self,request,format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events,many=True,context={'request': request})
        return Response(serializer.data)
    
    def post(self,request,format = None):
        serializer = EventSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class EventObject(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get_object(self,pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404
        
    def get(self,request,pk,format=None):
        event = self.get_object(pk)
        serializer = EventSerializer(event,many=False,context={'request': request})
        return Response(serializer.data)
    
    def delete(self,request,pk,format=None):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk,format=None):
        event = self.get_object(pk)
        serializer = EventSerializer(event,data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def ParticipantsList(request,format=None):
    
    if request.method == 'GET':
        participants = Participant.objects.all()
        serializer = ParticipantSerializer(participants,many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = ParticipantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



class ParticipantObject(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    def get_object(self,pk):
        try:
            return Participant.objects.get(pk=pk)
        except Participant.DoesNotExist:
            raise Http404
        
    def get(self,request,pk,format=None):
        event = self.get_object(pk)
        serializer = ParticipantSerializer(event,many=False)
        return Response(serializer.data)
    
    def delete(self,request,pk,format=None):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk,format=None):
        event = self.get_object(pk)
        serializer = ParticipantSerializer(event,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class FollowsEventList(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request,format=None):
        follows = FollowsEvent.objects.all()
        serializer = FollowsEventSerializer(follows,many = True,context={'request': request})
        return Response(serializer.data)
    
    def post(self,request,format=None):
        serializer = FollowsEventSerializer(data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class FollowsEventListObjectForUser(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get_object(self,pk):
        try:
            return FollowsEvent.objects.filter(user=pk)
        except FollowsEvent.DoesNotExist:
            raise Http404

    def get(self, request,pk,format=None):
        objects = self.get_object(pk)
        serializer = FollowsEventSerializer(objects,many = True,context={'request': request})
        return Response(serializer.data)
    

    