from django.shortcuts import render
from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth.forms import AuthenticationForm
# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import *

# import the Todo model from the models file
from .models import *

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import NewUserForm

# Email AUTH
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage
from .tokens import account_activation_token
from django.contrib.auth.models import User
from django.http import HttpResponse

# create a class for the Todo model viewsets
class MagnoliaCakesAndCupcakesView(viewsets.ModelViewSet):

	# create a serializer class and
	# assign it to the TodoSerializer class
	serializer_class = MagnoliaCakesAndCupcakesSerializer

	# define a variable and populate it
	# with the Todo list objects
	queryset = MagnoliaCakesAndCupcakes.objects.all()

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        form = NewUserForm(request.data)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()
            return activateEmail(request, user, form.cleaned_data.get('email'))
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


def activateEmail(request, user, to_email):
    mail_subject = 'Activate your user account.'
    message = render_to_string('template_activate_account.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        return Response({'message': 'User registered successfully. Please complete verification by clicking the link sent to your email.'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Problem sending confirmation email'}, status=status.HTTP_400_BAD_REQUEST)
    

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()

        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
        # return Response({'message': 'Thank you for your email confirmation. Now you can login your account.'}, status=status.HTTP_202_ACCEPTED)
    
    return HttpResponse('Activation link is invalid!')
    # return Response({'message': 'Activation link is invalid!'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request._request, data=request.data)
        
        if form.is_valid():
            username = request.data.get('username') 
            password = request.data.get('password')
            
            user = authenticate(request._request, username=username, password=password)
            if user is not None:
                django_login(request._request, user)  # Use django_login instead of login
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message': 'Login failed'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def terms_and_conditions(request):
    if request.method == 'GET':
        terms = TermsAndConditions.objects.first()
        serializer = TermsAndConditionsSerializer(terms)
        return Response(serializer.data)

    elif request.method == 'PUT':
        terms = TermsAndConditions.objects.first()
        serializer = TermsAndConditionsSerializer(terms, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Terms & Conditions updated'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)