# import serializers from the REST framework
from rest_framework import serializers

# import the todo data model
from .models import *

from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# create a serializer class
class MagnoliaCakesAndCupcakesSerializer(serializers.ModelSerializer):
    # create a meta class
    class Meta:
        model = MagnoliaCakesAndCupcakes
        fields = "title"


class TermsAndConditionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndCondition
        fields = "__all__"


class CakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cake
        fields = "__all__"


class SliderImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SliderImage
        fields = "__all__"


class FlavoursAndServingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlavoursAndServings
        fields = "__all__"


class FlavoursAndServingsInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlavoursAndServingsInfo
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
        model = FAQQuestion

        fields = "__all__"


class CakeCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CakeCategory
        fields = "__all__"


class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
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


class LocationPageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationPageContent
        fields = "__all__"


class WelcomeSectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageWelcomeSection
        fields = "__all__"


class AboutUsSectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageAboutUsSection
        fields = "__all__"


class GallerySectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageGallerySection
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"
        
class UserVideoSerialiser(serializers.ModelSerializer):
    class Meta:
        model = UserVideo
        fields = "__all__"

class StripeCouponSerialiser(serializers.ModelSerializer):
    class Meta:
        model = StripeCoupon
        fields = "__all__"
        
class StripePromotionSerialiser(serializers.ModelSerializer):
    class Meta:
        model = StripePromotion
        fields = "__all__"
        
class UserFirstOrderSerialiser(serializers.ModelSerializer):
    class Meta:
        model = UserFirstOrder
        fields = "__all__"

class QuoteSerializer(serializers.Serializer):
    name = serializers.CharField()
    mobile = serializers.CharField(required=False, allow_null=True)
    email = serializers.CharField()
    product_type = serializers.CharField(required=False, allow_null=True)
    servings_or_amount = serializers.IntegerField()
    serves = serializers.CharField(required=False, allow_null=True)
    date_of_event = serializers.DateField(required=False, allow_null=True)
    flavour = serializers.CharField(required=False, allow_null=True)
    filling = serializers.CharField(required=False, allow_null=True)
    
    class Meta:
        model = Quote
        fields = "__all__"
        extra_kwargs = {
            'name': {'required': True},
            'email': {'required': True},
            'servings_or_amount': {'required': True},
        }
        
    def create(self, validated_data):
        return Quote.objects.create(**validated_data)
    
class UserPurchaseSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = UserPurchase
        fields = "__all__"

    def create(self, validated_data):
        cakes_data = validated_data.get('cakes', [])
        videos_data = validated_data.get('videos', [])

        user_purchase = UserPurchase.objects.create(
            user=self.context['user'],
            amount_paid=validated_data.get('amount_paid')
        )

        # Save cakes and videos related to the purchase
        user_purchase.cakes.set(cakes_data)
        user_purchase.videos.set(videos_data)

        return user_purchase

        
class UserCustomerIDSerialiser(serializers.ModelSerializer):
    class Meta:
        model = UserCustomerID
        fields = "__all__"