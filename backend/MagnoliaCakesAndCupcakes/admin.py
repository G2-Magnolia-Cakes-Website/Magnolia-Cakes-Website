from django.contrib import admin

# Register your models here.
from .models import *


class SocialMediasAdmin(admin.ModelAdmin):
    list_display = (
        "social_media_platform",
        "account_name",
    )


admin.site.register(TermsAndConditions)
admin.site.register(Cake)
admin.site.register(AboutUs)
admin.site.register(FAQCategory)
admin.site.register(Question)
admin.site.register(FooterLocation)
admin.site.register(FooterContactUs)
admin.site.register(FooterBusinessHours)
admin.site.register(SocialMedias, SocialMediasAdmin)
