from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('EventsList',views.EventsList.as_view(),name = "EventList"),
    path('Event/<int:pk>',views.EventObject.as_view()),
    path('ParticipantsList',views.ParticipantsList.as_view(),name = "ParticipantsList"),
    path('ParticipantsList/<int:user>',views.ParticipantObjectForUser.as_view()),
    path('ParticipantsList/<int:user>/<int:event>',views.ParticipantObjectForUserDelete.as_view()),
    path('FollowEventsList',views.FollowsEventList.as_view()),
    path('FollowEventsList/<int:pk>',views.FollowsEventListObjectForUser.as_view()),
    path('FollowEventsList/<int:user>/<int:event>',views.FollowsEventListObjectForUserDelete.as_view()),
    path('FollowListForEvent/<int:event>',views.FollowsEventListObjectForEvent.as_view()),
    path('SavedEvents/<int:pk>',views.SavedEventsForUser.as_view()),
    path('SavedEvents/<int:user>/<int:event>',views.SavedEventDelete.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

