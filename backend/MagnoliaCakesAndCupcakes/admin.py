from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(TermsAndConditions)
admin.site.register(Cake)
admin.site.register(FlavoursAndServings)
