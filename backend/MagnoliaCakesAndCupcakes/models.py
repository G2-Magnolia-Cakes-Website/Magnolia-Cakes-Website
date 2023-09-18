from django.db import models


class MagnoliaCakesAndCupcakes(models.Model):
    title = models.CharField(max_length=150)

    # string representation of the class
    def __str__(self):
        # it will return the title
        return self.title


class TermsAndConditions(models.Model):
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)


def upload_to(instance, filename):
    # Upload the image to a 'cakes' directory with the filename as the cake's name
    return f"cakes/{filename}"


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
        if self.picture and hasattr(self.picture, "name"):
            self.picture.name = (
                f"{self.name}.png"  # You can change the file extension if needed
            )
        super(Cake, self).save(*args, **kwargs)


class AboutUs(models.Model):
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "About Us"

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)


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


class FooterLocation(models.Model):
    section_heading = models.CharField(max_length=150)
    location_address = models.TextField()

    class Meta:
        ordering = ["section_heading"]
        verbose_name_plural = "Footer Location"

    def __str__(self):
        return self.section_heading

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)


class FooterContactUs(models.Model):
    section_heading = models.CharField(max_length=150)
    contact_us_info = models.TextField()

    class Meta:
        ordering = ["section_heading"]
        verbose_name_plural = "Footer Contact Us"

    def __str__(self):
        return self.section_heading

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)


class FooterBusinessHours(models.Model):
    business_hrs_info = models.TextField()

    class Meta:
        verbose_name_plural = "Footer Business Hours"

    def __str__(self):
        return "Business Hours"

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)


class SocialMedias(models.Model):
    CHOICES = (
        ("facebook", "Facebook"),
        ("instagram", "Instagram"),
    )

    social_media_platform = models.CharField(max_length=300, choices=CHOICES)
    account_name = models.CharField(max_length=150)
    account_link = models.TextField()

    class Meta:
        ordering = ["social_media_platform"]
        verbose_name_plural = "Social Medias"

    def __str__(self):
        return self.account_name
