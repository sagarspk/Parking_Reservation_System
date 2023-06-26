from django.urls import path
from .views import Login,Register,Logout,VerifyEmail,ForgetPassword

urlpatterns = [
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('logout/', Logout.as_view(), name='logout'),
    path('verify_email/',VerifyEmail.as_view(), name ='verifyEmail'),
    path('forget_password/',ForgetPassword.as_view(), name = 'forgetPassword'),
]