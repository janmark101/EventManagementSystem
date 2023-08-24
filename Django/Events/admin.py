from django.contrib import admin
from .models import Event,Participant,FollowsEvent

admin.site.register(Event)
admin.site.register(Participant)
admin.site.register(FollowsEvent)