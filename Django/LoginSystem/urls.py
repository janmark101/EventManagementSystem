from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('UsersList',views.GetUsers,name="GetUsers"),
    path('User/<int:pk>',views.UserObject.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)