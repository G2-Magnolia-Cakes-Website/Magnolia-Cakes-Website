from django.contrib import admin
import pytz
from django.utils import timezone

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
            'fields': ('is_displayed', 'display_after', 'only_logged_in_users', 'only_first_purchase_of_user', 'description', ),
            'description': 'If is_displayed is checked, this promotion will popup on the frontend for users. Add a description if needed for users to see.',
        }),
    )

class CakeAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_categories', 'price', 'flavor')

    def display_categories(self, obj):
        return ', '.join([category.name for category in obj.categories.all()])
    display_categories.short_description = 'Categories'

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
    list_display = ('title', 'price', 'description')


admin.site.register(TermsAndCondition)
admin.site.register(Cake, CakeAdmin)
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
admin.site.register(Quote)
admin.site.register(HomepageWelcomeSection)
admin.site.register(HomepageAboutUsSection)
admin.site.register(HomepageGallerySection)
admin.site.register(Video, VideoAdmin)
admin.site.register(UserVideo, UserVideoAdmin)
admin.site.register(UserFirstOrder, UserFirstOrderAdmin)
admin.site.register(StripeCoupon, StripeCouponAdmin)
admin.site.register(StripePromotion, StripePromotionAdmin)
