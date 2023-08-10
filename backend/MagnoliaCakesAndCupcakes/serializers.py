# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import MagnoliaCakesAndCupcakes
 
# create a serializer class
class MagnoliaCakesAndCupcakesSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = MagnoliaCakesAndCupcakes
        fields = ('title')