from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('EventsList',views.EventsList,name = "EventList"),
    path('Event/<int:pk>',views.EventObject.as_view()),
    path('ParticipantsList',views.ParticipantsList,name = "ParticipantsList"),
]

urlpatterns = format_suffix_patterns(urlpatterns)