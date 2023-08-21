from django.db import models
from LoginSystem.models import User
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Event(models.Model):
    title = models.CharField(null=False,max_length=255)
    description = models.TextField(null=False,max_length=1000)
    location = models.CharField(null=False,max_length=150)
    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null = False)
    max_participants = models.PositiveIntegerField()
    number_of_participants = models.PositiveIntegerField(default=0)
    event_img = models.ImageField(upload_to='Events/media/events_img')
    organizer = models.ForeignKey(User,on_delete=models.CASCADE)
    city = models.CharField(null = False,max_length=150)
   

    def __str__(self):
        return self.title 
    
    
class Participant(models.Model):
    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    member = models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self):
        temp= self.member.get_full_name()
        return self.event.title + " - " + temp