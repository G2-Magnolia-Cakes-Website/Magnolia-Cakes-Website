# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import *


# create a serializer class
class MagnoliaCakesAndCupcakesSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = MagnoliaCakesAndCupcakes
        fields = "title"


class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditions
        fields = ("id", "content", "last_updated")


class CakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cake
        fields = "__all__"


class AboutUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutUs
        fields = ("id", "content", "last_updated")
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQCategory
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class FooterLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterLocation
        fields = "__all__"


class FooterContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterContactUs
        fields = "__all__"

class FooterBusinessHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterBusinessHours
        fields = "__all__"

class SocialMediasSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedias
        fields = "__all__"