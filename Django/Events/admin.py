from django.contrib import admin
from .models import Event,Participant,FollowsEvent,SavedEvent



admin.site.register(Event)
admin.site.register(Participant)
admin.site.register(FollowsEvent)
admin.site.register(SavedEvent)
