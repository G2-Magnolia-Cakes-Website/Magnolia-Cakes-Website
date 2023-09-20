from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(TermsAndCondition)
admin.site.register(Cake)
admin.site.register(AboutUs)
admin.site.register(FAQCategory)
admin.site.register(Question)
