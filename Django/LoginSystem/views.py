from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from .models import User
from .serializers import UserSerializer,RegisterUserSerializer


@api_view(['GET','POST'])
def GetUsers(request,format=None):
    if request.method == 'GET':
        Users = User.objects.all()
        serializer = UserSerializer(Users,many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

        
class UserObject(APIView):
    def get_object(self,pk):
        try :
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
        
    def get(self,request,pk,format=None):
        user = self.get_object(pk=pk)
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)
    
    def delete(self,request,pk,format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self,request,pk,format=None):
        user = self.get_object(pk=pk)
        serializer = UserSerializer(user,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)