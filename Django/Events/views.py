from .models import Event, Participant, FollowsEvent, SavedEvent
from .serializers import EventSerializer,ParticipantSerializer, FollowsEventSerializer, SavedSerializer
from rest_framework.response import Response
from .models import Event,Participant
from rest_framework import status, permissions, generics
from rest_framework.views import APIView
from django.http import Http404


class EventsList(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
        
    def get(self,request,format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events,many=True,context={'request': request})
        return Response(serializer.data)

class CreateNewEvent(APIView):
        
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
  
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        serializer = EventSerializer(data=request.data)
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


class EventUpdate(generics.UpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    queryset = Event.objects.all()
    serializer_class = EventSerializer 

class ParticipantsList(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get(self,request,format=None):
        particinapts = Participant.objects.all()
        serializer = ParticipantSerializer(particinapts,many=True,context={'request': request})
        return Response(serializer.data)

    def post(self,request,format=None):
        serializer = ParticipantSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ParticipantObjectForEvent(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get_object(self,event):
        try:
            return Participant.objects.filter(event=event)
        except Participant.DoesNotExist:
            raise Http404
        
    def get(self,request,event,format=None):
        events = self.get_object(event)
        serializer = ParticipantSerializer(events,many=True,context={'request': request})
        return Response(serializer.data)


class ParticipantObjectForUser(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get_object(self,user):
        try:
            return Participant.objects.filter(user=user)
        except Participant.DoesNotExist:
            raise Http404
        
    def get(self,request,user,format=None):
        events = self.get_object(user)
        serializer = ParticipantSerializer(events,many=True,context={'request': request})
        return Response(serializer.data)
    
class ParticipantObjectForUserDelete(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
        
    def delete(self,request,user,event,format=None):
        events = Participant.objects.filter(user=user,event=event).first()
        events.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class FollowsEventList(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request,format=None):
        follows = FollowsEvent.objects.all()
        serializer = FollowsEventSerializer(follows,many = True,context={'request': request})
        return Response(serializer.data)
    
    def post(self,request):
        serializer = FollowsEventSerializer(data=request.data)
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
    
    
class FollowsEventListObjectForUserDelete(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def delete(self,request,user,event,format=None):
        follow = FollowsEvent.objects.filter(user=user,event=event).first()
        follow.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class FollowsEventListObjectForEvent(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get_object(self,event):
        try:
            return FollowsEvent.objects.filter(event=event)
        except FollowsEvent.DoesNotExist:
            raise Http404

    def get(self, request,event,format=None):
        objects = self.get_object(event)
        serializer = FollowsEventSerializer(objects,many = True,context={'request': request})
        return Response(serializer.data)
    
class SavedEventsForUser(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get(self,request,pk,format=None):
        saved = SavedEvent.objects.filter(user=pk)
        serializer = SavedSerializer(saved,many = True,context={'request': request})
        return Response(serializer.data)
    
    def post(self,request,pk):
        serializer = SavedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SavedEventDelete(APIView):

    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def delete(self,request,user,event,format=None):
        saved = SavedEvent.objects.filter(user=user,event=event).first()
        saved.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
