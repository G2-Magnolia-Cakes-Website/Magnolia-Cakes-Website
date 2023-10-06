from django.db import models
from django.conf import settings
from django.core.files.storage import default_storage
from django.contrib.auth.models import User

from django.utils.text import slugify

# Reset Password
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.core.mail import EmailMessage
from django_rest_passwordreset.signals import reset_password_token_created


class MagnoliaCakesAndCupcakes(models.Model):
    title = models.CharField(max_length=150)

    # string representation of the class
    def __str__(self):
        # it will return the title
        return self.title
    


class TermsAndCondition(models.Model):
    policy_name = models.CharField(max_length=100)
    policy_content = models.TextField()

    class Meta:
        ordering = ["policy_name"]

    def __str__(self):
        return self.policy_name


class CakeCategory(models.Model):
    def upload_to__cake_category_cover(instance, filename):
        # Upload the image to a 'cakes' directory with the filename as the cake's name
        return f"cake-category-cover/{filename}"

    name = models.CharField(max_length=100)
    picture = models.ImageField(
        upload_to=upload_to__cake_category_cover
    )  # Use the custom upload function

    def __str__(self):
        return self.name


def upload_to(instance, filename):
    # Upload the image to a 'cakes' directory with the filename as the cake's name
    return f"cakes/{filename}"


class Cake(models.Model):
    name = models.CharField(max_length=100, unique=True)

    picture = models.ImageField(upload_to=upload_to)  # Use the custom upload function
    price = models.DecimalField(max_digits=10, decimal_places=2)
    flavor = models.CharField(max_length=50)
    categories = models.ManyToManyField(CakeCategory)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Rename the uploaded image to match the cake's name
        if self.picture and hasattr(self.picture, "name"):
            self.picture.name = (
                f"{self.name}.png"  # You can change the file extension if needed
            )
        super(Cake, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete the associated image from Google Cloud Storage
        if self.picture and hasattr(self.picture, "name"):
            image_path = self.picture.name
            default_storage.delete(image_path)

        super(Cake, self).delete(*args, **kwargs)


class SliderImage(models.Model):
    def upload_to_slider(instance, filename):
        # Upload the image to a 'slider' directory with the filename as the cake's name
        return f"slider/{filename}"

    name = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to=upload_to_slider
    )  # Use the custom upload function

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Slider Images"

    def save(self, *args, **kwargs):
        # Rename the uploaded image to match the cake's name
        if self.image and hasattr(self.image, "name"):
            self.image.name = (
                f"{self.name}.png"  # You can change the file extension if needed
            )
        super(SliderImage, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete the associated image from Google Cloud Storage
        if self.image and hasattr(self.image, "name"):
            image_path = self.image.name
            default_storage.delete(image_path)

        super(SliderImage, self).delete(*args, **kwargs)


class AboutUs(models.Model):
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "About Us"

    class Meta:
        verbose_name_plural = "About Us Page"

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)


class FAQCategory(models.Model):
    title = models.CharField(max_length=100)

    class Meta:
        ordering = ["title"]
        verbose_name_plural = "FAQ Categories"

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=150)
    answer = models.TextField()
    category = models.ManyToManyField(FAQCategory)

    class Meta:
        ordering = ["question"]
        verbose_name_plural = "FAQ Questions"

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

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Footer Business Hours"

    def __str__(self):
        return "Business Hours"


class FlavoursAndServings(models.Model):
    CHOICES = (
        ("Flavours", "Flavours"),
        ("Fillings", "Fillings"),
    )

    title = models.CharField(max_length=100)
    type = models.CharField(max_length=100, choices=CHOICES, default="Flavours")
    list = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title}"

    class Meta:
        ordering = ["title"]
        verbose_name_plural = "Flavours and Servings Lists"


class FlavoursAndServingsInfo(models.Model):
    heading = models.CharField(max_length=200)
    description = models.TextField()
    extra_points = models.TextField()

    class Meta:
        verbose_name_plural = "Flavours and Servings Info"

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Flavours and Servings Info"


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


@receiver(reset_password_token_created)
def password_reset_token_created(
    sender, instance, reset_password_token, *args, **kwargs
):
    # send an e-mail to the user
    reset_password_link = (
        f"{settings.FRONTEND_APP_URL}/reset-password/?token={reset_password_token.key}"
    )

    context = {
        "current_user": reset_password_token.user,
        "firstname": reset_password_token.user.first_name,
        "lastname": reset_password_token.user.last_name,
        "email": reset_password_token.user.email,
        "reset_password_link": reset_password_link,
    }

    # render email text
    email_message = render_to_string("user_reset_password.html", context)

    mail_subject = "Password Reset for {title}".format(title="Magnolia Cakes")

    msg = EmailMessage(
        mail_subject,
        # message:
        email_message,
        # from:
        settings.EMAIL_FROM,
        # to:
        [reset_password_token.user.email],
    )
    msg.send()


class GalleryItem(models.Model):
    title = models.CharField(max_length=100, unique=True)
    categories = models.ManyToManyField(CakeCategory)
    image = models.ImageField(upload_to="gallery/")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # Generate a unique filename based on the title
        filename = f"{slugify(self.title)}.png"
        self.image.name = filename  # Save directly to 'gallery' folder
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete the associated image from the bucket
        if self.image:
            image_path = self.image.name
            default_storage.delete(image_path)
        super().delete(*args, **kwargs)


class LocationPageContent(models.Model):
    location_heading = models.CharField(max_length=200)
    location_info = models.TextField()
    business_hours_heading = models.CharField(max_length=200)
    business_hours_info = models.TextField()

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Location Page Content"

    def __str__(self):
        return "Location Page Content"


class ContactUsEmail(models.Model):
    your_email = models.CharField(
        max_length=200,
        help_text="This will be the email that receives Contact Us and Get A Quote submissions.",
    )

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Contact Us Email"

    class Meta:
        verbose_name_plural = "Contact Us Email"


class BackupEmail(models.Model):
    email = models.CharField(
        max_length=200,
        help_text="This will be a backup email that receives Contact Us and Get A Quote submissions.",
    )

    def __str__(self):
        return "Backup Email"

    class Meta:
        verbose_name_plural = "Contact Us Backup Emails"


class Quote(models.Model):
    name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=10, blank=True, null=True)
    email = models.CharField(max_length=200)
    product_type = models.CharField(max_length=20, blank=True, null=True)
    servings_or_amount = models.IntegerField()
    serves = models.CharField(max_length=20, blank=True, null=True)
    date_of_event = models.DateField(blank=True, null=True)
    flavour = models.CharField(max_length=30, blank=True, null=True)
    filling = models.CharField(max_length=30, blank=True, null=True)
    time_submitted = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = [
            "time_submitted",
            "name",
            "product_type",
            "date_of_event",
            "flavour",
            "filling",
        ]

class HomepageWelcomeSection(models.Model):
    def upload_to_welcome(instance, filename):
        # Upload the image to a 'cakes' directory with the filename as the cake's name
        return f"welcome/{filename}"

    heading = models.TextField()
    paragraph = models.TextField()
    image = models.ImageField(upload_to=upload_to_welcome)

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Welcome Section Content"

    class Meta:
        verbose_name_plural = "Homepage Welcome Section"


class HomepageAboutUsSection(models.Model):
    heading = models.CharField(default="About Us", max_length=300)
    paragraph = models.TextField()

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "About Us Section Content"

    class Meta:
        verbose_name_plural = "Homepage About Us Section"


class HomepageGallerySection(models.Model):
    heading = models.CharField(default="Our Collection", max_length=300)

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return self.heading

    class Meta:
        verbose_name_plural = "Homepage Gallery Section"


class Video(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    video = models.FileField(upload_to="videos/")

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.video:
            # Generate a unique filename based on the title
            filename = f"{slugify(self.title)}.mp4"
            self.video.name = filename  # Save directly to 'videos' folder
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete the associated video from the bucket
        if self.video:
            video_path = self.video.name
            default_storage.delete(video_path)
        super().delete(*args, **kwargs)


class UserVideo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    videos = models.ManyToManyField(Video)

    def __str__(self):
        return self.user.username 

    class Meta:
        ordering = ["user"]
