from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','password','firstname','lastname','last_login','description','profile_img']
        
class RegisterUserSerializer(serializers.Serializer):
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self,data):
        user_email = data.get('email')
        existing_object = User.objects.filter(email=user_email)
        if existing_object :
            raise serializers.ValidationError("Taki obiekt juz istnieje")  #400 error

        return data
    
    def create(self,validated_data):  #włącza sie przy metodzie serializers.save()
        user = User.objects.create_user(**validated_data)
        return user
    
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    ##
    class Meta:
        model = User
        fields = ['email','password']
        
    def check_user(self,clean_data):
        user = authenticate(email=clean_data['email'],password=clean_data['password'])
        if not user:
            raise ValidationError("user not found")
        return user
    
    
