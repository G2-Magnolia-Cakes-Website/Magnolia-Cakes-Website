from django.db import models
from django.conf import settings
from django.core.files.storage import default_storage

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

    def delete(self, *args, **kwargs):
        # Delete the associated image from Google Cloud Storage
        if self.picture and hasattr(self.picture, "name"):
            image_path = self.picture.name
            default_storage.delete(image_path)

        super(Cake, self).delete(*args, **kwargs)


class AboutUs(models.Model):
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)


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


class FlavoursAndServings(models.Model):
    title = models.CharField(max_length=100)
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

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Flavours and Servings Info"

    class Meta:
        verbose_name_plural = "Flavours and Servings Info"


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
