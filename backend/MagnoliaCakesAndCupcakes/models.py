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
    
class Cake(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    picture = models.ImageField(upload_to='cakes/')  # Requires installing Pillow
    description = models.TextField()
    flavor = models.CharField(max_length=50)

    def __str__(self):
        return self.name