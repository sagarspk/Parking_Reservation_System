from django.urls import path
from .views import (UserLogin,
                    UserRegister,
                    ControllerLogin,
                    ControllerRegister,
                    Logout,
                    VerifyEmail,
                    ForgetPassword,
                    ChangePassword)

urlpatterns = [
    path('user/login', UserLogin.as_view(), name='userLogin'),
    path('user/register', UserRegister.as_view(), name='userRegister'),
    path('controller/login', ControllerLogin.as_view(), name='controllerView'),
    path('controller/register', ControllerRegister.as_view(), name='conrollerRegister'),
    path('logout', Logout.as_view(), name='logout'),
    path('verify_email',VerifyEmail.as_view(), name ='verifyEmail'),
    path('forget_password',ForgetPassword.as_view(), name = 'forgetPassword'),
    path('change_password', ChangePassword.as_view(), name = 'changePassword'),
]