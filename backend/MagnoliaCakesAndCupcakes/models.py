from django.db import models
 
class MagnoliaCakesAndCupcakes(models.Model):
    title=models.CharField(max_length=150)
 
    # string representation of the class
    def __str__(self):
 
        #it will return the title
        return self.title

class TermsAndConditions(models.Model):
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)