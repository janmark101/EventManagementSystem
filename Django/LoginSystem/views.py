from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from django.http import Http404, JsonResponse
from .models import User
from .serializers import UserSerializer,RegisterUserSerializer,UserLoginSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model, login, logout,authenticate
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework import permissions, status
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token

    
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
    authentication_classes = (SessionAuthentication,)
 
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email:
            raise ValidationError("Please insert an email.")
        
        if not password:
            raise ValidationError("Please insert an password.")
        serializer = UserLoginSerializer(data=request.data)    
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(request.data)
            login(request,user)
            return Response({'message': 'Logged in successfully'},status=status.HTTP_200_OK)
           


class LogoutView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def post(self, request):
        # print(request.user)
        # user = request.user
        logout(request)  # Wylogowanie użytkownika
        
        return Response({'message': 'Logged out successfully'})
    

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    def get(self,request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)
    
    

# class LoginView(APIView):
#     permission_classes = (permissions.AllowAny,)
#     authentication_classes = (SessionAuthentication,)
    
#     def post(self,request,format = None):
#         user = get_object_or_404(User, email=request.data['email'])
#         if not user.check_password(request.data['password']):
#             return Response("missing user", status=status.HTTP_404_NOT_FOUND)
#         login(request,user)
#         token, created = Token.objects.get_or_create(user=user)
#         serializer = UserSerializer(user)
#         return Response({'token': token.key, 'user': serializer.data})