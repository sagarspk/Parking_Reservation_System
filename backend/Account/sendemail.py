from django.core.mail import send_mail
from django.conf import settings

def send_email(subject, message, recipients):
     result = send_mail(subject=subject,
                         message=message,
                         from_email=settings.EMAIL_HOST_USER,
                         recipient_list=[recipients],
                         fail_silently=False)
     return result