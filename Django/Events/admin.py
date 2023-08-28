from django.contrib import admin
from .models import Event,Participant,FollowsEvent,SavedEvent

class EventAdmin(admin.ModelAdmin):
    list_display = ('date_created','title') 

admin.site.register(Event, EventAdmin)
admin.site.register(Participant)
admin.site.register(FollowsEvent)
admin.site.register(SavedEvent)