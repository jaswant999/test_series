# urls.py

from django.urls import path
from app_user.views import RegisterView, LoginView
from . views import UserListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserListView.as_view(), name='user-list'),
]
