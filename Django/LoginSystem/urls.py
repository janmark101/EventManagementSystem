from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('UsersList',views.GetUsers.as_view(),name="GetUsers"),
    path('User/<int:pk>',views.UserObject.as_view()),
    path('Login/',views.LoginView.as_view(),name='api-login'),
    path('Logout/',views.LogoutView.as_view(),name='api-logout'),
]

urlpatterns = format_suffix_patterns(urlpatterns)