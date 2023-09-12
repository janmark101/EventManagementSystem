from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model



User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','password','firstname','lastname','last_login','description','profile_img','date_created']
        
    def get_event_img(self, obj):
        if obj.profile_img:
            return self.context['request'].build_absolute_uri(obj.profile_img.url)
        return None
        
class RegisterUserSerializer(serializers.Serializer):
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
    def validate(self,data):
        user_email = data.get('email')
        existing_object = User.objects.filter(email=user_email)
        if existing_object :
            raise serializers.ValidationError("This email already exists!")  

        return data
    
    def create(self,validated_data):  #włącza sie przy metodzie serializers.save()
        user = User.objects.create_user(**validated_data)
        return user
    
    

    
