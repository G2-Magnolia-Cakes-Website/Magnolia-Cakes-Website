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
    
def upload_to(instance, filename):
    # Upload the image to a 'cakes' directory with the filename as the cake's name
    return f'cakes/{filename}'

class Cake(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    picture = models.ImageField(upload_to=upload_to)  # Use the custom upload function
    description = models.TextField()
    flavor = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Rename the uploaded image to match the cake's name
        if self.picture and hasattr(self.picture, 'name'):
            self.picture.name = f'{self.name}.png'  # You can change the file extension if needed
        super(Cake, self).save(*args, **kwargs)

class FAQCategory(models.Model):
    title = models.CharField(max_length=100)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title

class Question(models.Model):
    question = models.CharField(max_length=150)
    answer = models.TextField()
    category = models.ManyToManyField(FAQCategory)

    class Meta:
        ordering = ["question"]

    def __str__(self):
        return self.question