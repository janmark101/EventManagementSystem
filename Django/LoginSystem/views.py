from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404
from .models import User
from .serializers import UserSerializer,RegisterUserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import  TokenAuthentication
from rest_framework import permissions, status 
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

    
class GetUsers(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self,request,format = None):
        users = User.objects.all()
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)
    
    def post(self,request,format = None):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserObject(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
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
    
    
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if not user:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key,'id':user.id})

class LogoutView(APIView):



    def post(self, request):
        request.auth.delete()  # Usuń token autoryzacyjny
        return Response(status=status.HTTP_200_OK)