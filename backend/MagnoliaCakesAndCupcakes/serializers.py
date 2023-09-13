# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import *
 
# create a serializer class
class MagnoliaCakesAndCupcakesSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = MagnoliaCakesAndCupcakes
        fields = ('title')
        
class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditions
        fields = ('id', 'content', 'last_updated')

class CakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cake
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQCategories
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'