from .models import Event, Participant
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'
        
    def validate(self,data):
        member = data.get('member')
        event = data.get('event')
        existing_object = Participant.objects.filter(member=member,event=event)
        if existing_object :
            raise serializers.ValidationError("Taki obiekt juz istnieje")  #400 error

        return data