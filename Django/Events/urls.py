from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('EventsList',views.EventsList.as_view(),name = "EventList"),
    path('Event/<int:pk>',views.EventObject.as_view()),
    path('ParticipantsList',views.ParticipantsList,name = "ParticipantsList"),
    path('Participant/<int:pk>',views.ParticipantObject.as_view()),
    path('FollowEventsList',views.FollowsEventList.as_view()),
    path('FollowEventsList/<int:pk>',views.FollowsEventListObjectForUser.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)