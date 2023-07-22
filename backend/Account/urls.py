from django.urls import path
from .views import (UserLogin,
                    UserAuthenticated,
                    UserRegister,
                    ControllerLogin,
                    ControllerRegister,
                    Logout,
                    VerifyEmail,
                    ForgetPassword,
                    ChangePassword,
                    OTP,
                    ChangeForgetPassword)

urlpatterns = [
    path('user', UserAuthenticated.as_view(), name='userAuthCheck'),
    path('user/login', UserLogin.as_view(), name='userLogin'),
    path('user/register', UserRegister.as_view(), name='userRegister'),
    path('controller/login', ControllerLogin.as_view(), name='controllerView'),
    path('controller/register', ControllerRegister.as_view(), name='conrollerRegister'),
    path('change_password', ChangePassword.as_view(), name = 'changePassword'),
    path('logout', Logout.as_view(), name='logout'),
    path('verify_email',VerifyEmail.as_view(), name ='verifyEmail'),
    path('forget_password',ForgetPassword.as_view(), name = 'forgetPassword'),
    path('otp',OTP.as_view(), name = 'opt'),
    path('change_forget_password', ChangeForgetPassword.as_view(),name='changeforgetpassword'),
    path('change_password', ChangePassword.as_view(), name = 'changePassword'),
]