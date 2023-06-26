from django.urls import path
from .views import Login,Register,Logout

urlpatterns = [
    path('login/', Login.as_view(), name='api-login'),
    path('register/', Register.as_view(), name='api-register'),
    path('logout/', Logout.as_view(), name='api-logout'),
]