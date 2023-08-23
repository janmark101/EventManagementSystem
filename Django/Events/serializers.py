from .models import Event, Participant
from rest_framework import serializers


class EventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Event
        fields = '__all__'
        
    def get_event_img(self, obj):
        if obj.event_img:
            return self.context['request'].build_absolute_uri(obj.event_img.url)
        return None
    
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