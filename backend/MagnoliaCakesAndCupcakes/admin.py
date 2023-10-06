from django.contrib import admin

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
        "redeem_by",
        "stripe_coupon_id",
    )
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
        "description",
    )
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
            'fields': ('is_displayed', 'onlyLoggedInUsers', 'description', ),
            'description': 'If is_displayed is checked, this promotion will popup on the frontend for users. Add a description if needed for users to see.',
        }),
    )


admin.site.register(TermsAndCondition)
admin.site.register(Cake)
admin.site.register(FlavoursAndServings)
admin.site.register(AboutUs)
admin.site.register(FAQCategory)
admin.site.register(Question)
admin.site.register(FooterLocation)
admin.site.register(FooterContactUs)
admin.site.register(FooterBusinessHours)
admin.site.register(SocialMedias, SocialMediasAdmin)
admin.site.register(FlavoursAndServingsInfo)
admin.site.register(CakeCategory)
admin.site.register(GalleryItem)
admin.site.register(LocationPageContent)
admin.site.register(SliderImage)
admin.site.register(ContactUsEmail)
admin.site.register(HomepageWelcomeSection)
admin.site.register(HomepageAboutUsSection)
admin.site.register(HomepageGallerySection)
admin.site.register(Video)
admin.site.register(UserVideo)
admin.site.register(StripeCoupon, StripeCouponAdmin)
admin.site.register(StripePromotion, StripePromotionAdmin)
