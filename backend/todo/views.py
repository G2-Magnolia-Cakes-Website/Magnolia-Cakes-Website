from django.shortcuts import render

# import view sets from the REST framework
from rest_framework import viewsets

# import the TodoSerializer from the serializer file
from .serializers import TodoSerializer

# import the Todo model from the models file
from .models import Todo

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .forms import NewUserForm
# create a class for the Todo model viewsets
class TodoView(viewsets.ModelViewSet):

	# create a serializer class and
	# assign it to the TodoSerializer class
	serializer_class = TodoSerializer

	# define a variable and populate it
	# with the Todo list objects
	queryset = Todo.objects.all()

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        form = NewUserForm(request.data)
        if form.is_valid():
            user = form.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)