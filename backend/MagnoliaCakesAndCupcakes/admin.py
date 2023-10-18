from django.contrib import admin
import pytz
from django.utils import timezone
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from .models import *


class SocialMediasAdmin(admin.ModelAdmin):
    list_display = (
        "social_media_platform",
        "account_name",
    )

class StripeCouponAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "amount_off",
        "percent_off",
        "max_redemptions",
        "formatted_redeem_by",
        "stripe_coupon_id",
    )

    def formatted_redeem_by(self, obj):
        if obj.redeem_by is not None:
            melbourne_timezone = pytz.timezone("Australia/Melbourne")
            melbourne_expiry = obj.redeem_by.astimezone(melbourne_timezone)
            return melbourne_expiry.strftime("%b. %d, %Y, %I:%M %p")
        return None
    formatted_redeem_by.short_description = "redeem_by (Melbourne Timezone)"

    fieldsets = (
        ('Name', {
            'fields': ('name',),
            'description': 'This will appear on customers\' receipts and invoices. You can edit this whenever you\'d like.',
        }),
        ('Discount', {
            'fields': ('amount_off', 'percent_off'),
            'description': 'You may only choose one (either amount off or percent off). This fields cannot be edited later.',
        }),
        ('Redemptions', {
            'fields': ('max_redemptions', 'redeem_by'),
            'description': 'You cannot edit these fields after creating the coupon. Please choose date/time according to server time, not your current timezone.',
        }),
    )

class StripePromotionAdmin(admin.ModelAdmin):
    list_display = (
        "code",
        "coupon",
        "is_displayed",
        "display_after_formatted",
        "only_logged_in_users",
        "only_first_purchase_of_user",
        'minimum_amount',
        "description",
    )
    def display_after_formatted(self, obj):
        return str(obj.display_after) + " (seconds)"
    display_after_formatted.short_description = "Display After (seconds)"

    fieldsets = (
        ('Promotion Code', {
            'fields': ('code',),
            'description': 'This is the code users will need to use for the discount. You may also leave this empty and Stripe will create one for you.',
        }),
        ('Linked Coupon', {
            'fields': ('coupon',),
            'description': 'You must link the promotion code to a coupon.',
        }),
        ('Display to Users?', {
            'fields': ('is_displayed', 'display_after', 'only_logged_in_users', 'only_first_purchase_of_user', 'minimum_amount', 'description', ),
            'description': 'If is_displayed is checked, this promotion will popup on the frontend for users. Add a description if needed for users to see.',
        }),
    )



class ContactUsEmailAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'your_email')

class FlavoursAndServingsAdmin(admin.ModelAdmin):
    list_display = ('title', 'list', 'last_updated')

class UserFirstOrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'madeFirstOrder')

class UserVideoAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_videos')

    def display_videos(self, obj):
        return ', '.join([video.title for video in obj.videos.all()])
    display_videos.short_description = 'Videos'

class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'price', 'active')

class UserPurchaseAdmin(admin.ModelAdmin):
    list_display = ('user', 'display_cakes', 'display_videos', 'amount_paid', 'time_submitted')

    def display_videos(self, obj):
        return ', '.join([video.title for video in obj.videos.all()])
    display_videos.short_description = 'Videos'

    def display_cakes(self, obj):
        return ', '.join([cake.name for cake in obj.cakes.all()])
    display_cakes.short_description = 'Cake'

admin.site.register(Cake)
admin.site.register(TermsAndCondition)
admin.site.register(Product)
admin.site.register(FlavoursAndServings, FlavoursAndServingsAdmin)
admin.site.register(AboutUs)
admin.site.register(FAQCategory)
admin.site.register(FAQQuestion)
admin.site.register(FooterLocation)
admin.site.register(FooterContactUs)
admin.site.register(FooterBusinessHours)
admin.site.register(SocialMedias, SocialMediasAdmin)
admin.site.register(FlavoursAndServingsInfo)
admin.site.register(CakeCategory)
admin.site.register(GalleryItem)
admin.site.register(LocationPageContent)
admin.site.register(SliderImage)
admin.site.register(ContactUsEmail, ContactUsEmailAdmin)
admin.site.register(BackupEmail)
admin.site.register(Quote, ImportExportModelAdmin)
admin.site.register(HomepageWelcomeSection)
admin.site.register(HomepageAboutUsSection)
admin.site.register(HomepageGallerySection)
admin.site.register(Video, VideoAdmin)
admin.site.register(UserVideo, UserVideoAdmin)
admin.site.register(UserFirstOrder, UserFirstOrderAdmin)
admin.site.register(StripeCoupon, StripeCouponAdmin)
admin.site.register(StripePromotion, StripePromotionAdmin)
admin.site.register(UserPurchase, UserPurchaseAdmin)
# admin.site.register(UserCustomerID)
