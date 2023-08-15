from django.shortcuts import render
from django.contrib.auth import authenticate, login as django_login
from django.contrib.auth.forms import AuthenticationForm
# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import MagnoliaCakesAndCupcakesSerializer

# import the Todo model from the models file
from .models import MagnoliaCakesAndCupcakes

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import NewUserForm

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
            user = form.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request._request, data=request.data)
        
        if form.is_valid():
            email = request.data.get('username') 
            password = request.data.get('password')
            
            user = authenticate(request._request, username=email, password=password)
            if user is not None:
                django_login(request._request, user)  # Use django_login instead of login
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'message': 'Login failed'}, status=status.HTTP_400_BAD_REQUEST)
