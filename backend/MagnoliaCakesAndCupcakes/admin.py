from django.contrib import admin

# Register your models here.
from .models import *


class SocialMediasAdmin(admin.ModelAdmin):
    list_display = (
        "social_media_platform",
        "account_name",
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
admin.site.register(GalleryCategory)
admin.site.register(GalleryItem)
admin.site.register(LocationPageContent)
admin.site.register(SliderImage)
admin.site.register(ContactUsEmail)
admin.site.register(HomepageWelcomeSection)
admin.site.register(HomepageAboutUsSection)
admin.site.register(HomepageGallerySection)
