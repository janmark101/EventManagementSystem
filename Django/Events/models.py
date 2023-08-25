from django.db import models
from LoginSystem.models import User
from django.conf import settings
from django.utils import timezone

User = settings.AUTH_USER_MODEL

class Event(models.Model):
    title = models.CharField(null=False,max_length=255)
    description = models.TextField(null=False,max_length=10000)
    location = models.CharField(null=False,max_length=150)
    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null = False)
    max_participants = models.PositiveIntegerField()
    number_of_participants = models.PositiveIntegerField(default=0)
    event_img = models.ImageField(upload_to='Events/media/events_img')
    organizer = models.ForeignKey(User,on_delete=models.CASCADE)
    city = models.CharField(null = False,max_length=150)
    normal_price = models.CharField(null=False,max_length=30)
    reduced_price = models.CharField(null = False,max_length=30)
    reduce_ticket_info = models.CharField(null = True,max_length=200,default='Childs (0-12) Students (13-24) Seniors(65+)')
    date_created = models.DateTimeField(auto_now_add=True,null = False)

    def __str__(self):
        return self.title 
    
    
class Participant(models.Model):
    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    member = models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self):
        temp= self.member.get_full_name()
        return self.event.title + " - " + temp
    
class FollowsEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event,on_delete=models.CASCADE)
    
    