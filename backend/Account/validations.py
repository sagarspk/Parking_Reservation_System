from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from .models import User

UserModel=get_user_model()

def user_register_validation(data):
    # stripping
    data['first_name'] = data['first_name'].strip()
    data['last_name'] = data['last_name'].strip()
    data['email'] = data['email'].strip()
    data['contact'] = data['contact'].strip()
    data['password'] = data['password'].strip()
    email = data['email']
    first_name = data['first_name']
    last_name = data['last_name']
    password = data['password']
    contact = data['contact']
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Choose another email')
    if not password or len(password) < 8:
        raise ValidationError('Choose another password, min length 8')
    if not contact:
        raise ValidationError('Enter Valid phone number')
    if not first_name:
        raise ValidationError('Invalid First Name')
    if not last_name:
        raise ValidationError('Invalid Last Name')
    return data


def controller_register_validation(data):
    # stripping
    data['email'] = data['email'].strip()
    data['password'] = data['password'].strip()
    email = data['email']
    password = data['password']
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Choose another email')
    if not password or len(password) < 8:
        raise ValidationError('Choose another password, min length 8')
    return data


def login_validation(data):
    
    # data['username'] = data['username'].strip()
    # data['email'] = data['email'].strip()
    # username = data['username']
    # email = data['email']
    # password = data['password']
    
    #Check if either username or email is provided
    # try:
    #     if data['username']:
    #         data['username']=data['username'].strip()
    # except:
    # data['email']=data['email'].strip()
    if UserModel.objects.filter(email=data['username']).exists():
        user_obj = UserModel.objects.get(email=data['username'])
        data['username'] = user_obj.get_username()
            
    data['username']=data['username'].strip()       
    data['password'] = data['password'].strip()
    
    if not UserModel.objects.filter(username=data['username']).exists():
        raise ValidationError('User does not exists.')
    if not data['password'] or len(data['password'])<8:
        raise ValidationError('Password length should be greater than 8.')
    return data