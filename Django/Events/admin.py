from django.contrib import admin
from .models import Event,Participant,FollowsEvent

class EventAdmin(admin.ModelAdmin):
    list_display = ('date_created','title')  # Dodaj 'date_created' i inne pola

admin.site.register(Event, EventAdmin)
admin.site.register(Participant)
admin.site.register(FollowsEvent)