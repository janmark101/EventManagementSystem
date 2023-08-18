from django.shortcuts import render
from .models import Event, Participant
from .serializers import EventSerializer,ParticipantSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Event,Participant
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404

@api_view(['GET','POST'])
def EventsList(request,format=None):
    
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events,many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class EventObject(APIView):
    def get_object(self,pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            raise Http404
        
    def get(self,request,pk,format=None):
        event = self.get_object(pk)
        serializer = EventSerializer(event,many=False)
        return Response(serializer.data)
    
    def delete(self,request,pk,format=None):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
    
    
