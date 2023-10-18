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

# Coupon/Promotions
from django.db.models.signals import post_save
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import stripe
from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
import pytz
from stripe.error import InvalidRequestError


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
        verbose_name_plural = "Terms And Conditions"

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

    class Meta:
        verbose_name_plural = "Cake Categories"

def upload_to(instance, filename):
    # Upload the image to a 'cakes' directory with the filename as the cake's name
    return f"cakes/{filename}"

class ProductType(models.TextChoices):
    CAKE = 'Cake'
    CUPCAKE = 'Cupcake'

    
class Product(models.Model):
    name = models.CharField(max_length=100, unique=True)
    picture = models.ImageField(upload_to=upload_to)
    price = models.DecimalField(max_digits=10,blank=True, decimal_places=2, default=0.00)
    flavor = models.CharField(max_length=50)
    description = models.TextField(default='', max_length=300)
    active = models.BooleanField(default=True)
    product_id = models.CharField(max_length=100, blank=True, editable=False)
    price_id = models.CharField(max_length=100, blank=True, editable=False)
    product_type = models.CharField(
        max_length=10,
        choices=ProductType.choices,
        default=ProductType.CAKE
    )
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.product_type == ProductType.CAKE:
            # If the product type is "Cake," simply save the instance
            super(Product, self).save(*args, **kwargs)
            return
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            if self.product_id:
                # Product is being modified
                stripe_product = stripe.Product.retrieve(self.product_id)
                stripe_price = stripe.Price.retrieve(stripe_product.default_price)

                # Price changed or not
                if ((self.price * 100) != stripe_price.unit_amount):
                    # Price changed

                    price = stripe.Price.create(
                        product= self.product_id,
                        unit_amount=int(self.price * 100),
                        currency='aud',
                    )
                
                    stripe.Product.modify(
                        self.product_id,
                        name=self.name,
                        description= self.description,
                        active = self.active,
                        metadata = {
                            'flavor': self.flavor
                        },
                        default_price= price.id
                    )

                    stripe.Price.modify(
                        self.price_id,
                        active=False,
                    )
                else:
                    # Price not changed
                    stripe.Product.modify(
                        self.product_id,
                        name=self.name,
                        description= self.description,
                        active = self.active,
                        metadata = {
                            'flavor': self.flavor
                        },
                    )
            else:
                # Create a new coupon in Stripe
                product = stripe.Product.create(
                    name = self.name,
                    description = self.description,
                    active = self.active,
                    metadata = {
                        'flavor': self.flavor
                    },
                )
                self.product_id = product.id

                # Create the price
                price = stripe.Price.create(
                    product= product.id,
                    unit_amount=int(self.price * 100),
                    currency='aud',
                )
                self.price_id = price.id

                # Make price default price
                stripe.Product.modify(
                    self.product_id,
                    default_price= price.id
                )

            # Rename the uploaded image to match the cake's name
            if self.picture and hasattr(self.picture, "name"):
                self.picture.name = (
                    f"{self.name}.png"  # You can change the file extension if needed
                )
            super(Product, self).save(*args, **kwargs)

        except stripe.error.StripeError as e:
            # Handle the Stripe API error
            raise ValidationError(f"Failed to update Stripe product: {str(e)}")


    def delete(self, *args, **kwargs):
        # Only attempt to delete cupcake:
        
        if self.product_type == ProductType.CUPCAKE:
            # Delete on stripe:
            try:
                stripe.api_key = settings.STRIPE_SECRET_KEY
                stripe.Product.modify(
                    self.product_id,
                    active=False,
                )
            except InvalidRequestError as e:
                if e.code == "resource_missing":
                    # The product does not exist in Stripe, so it's considered deleted
                    pass
                else:
                    # Handle any other errors that occur during the API request
                    raise ValidationError(f"Failed to delete Stripe product: {str(e)}")
            except stripe.error.StripeError as e:
                # Handle any other errors that occur during the API request
                raise ValidationError(f"Failed to delete Stripe product: {str(e)}")
        
        # Delete the associated image from Google Cloud Storage
        if self.picture and hasattr(self.picture, "name"):
            image_path = self.picture.name
            default_storage.delete(image_path)

        super(Product, self).delete(*args, **kwargs)

class Cake(models.Model):
    cake = models.ForeignKey('Product', on_delete=models.CASCADE, related_name='size_prices', limit_choices_to={'product_type': ProductType.CAKE})
    size = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    product_id = models.CharField(max_length=100, blank=True, editable=False)
    price_id = models.CharField(max_length=100, blank=True, editable=False)
    
    def __str__(self):
        return f"{self.cake.name} - {self.size} - ${self.price}"
    
    def save(self, *args, **kwargs):
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            if self.cake.product_id:
                # Cake product is being modified
                stripe_product = stripe.Product.retrieve(self.cake.product_id)
                stripe_price = stripe.Price.retrieve(stripe_product.default_price)

                # Price changed or not
                if ((self.price * 100) != stripe_price.unit_amount):
                    # Price changed
                    price = stripe.Price.create(
                        product=self.cake.product_id,
                        unit_amount=int(self.price * 100),
                        currency='aud',
                    )

                    stripe.Product.modify(
                        self.cake.product_id,
                        default_price=price.id
                    )

                    stripe.Price.modify(
                        self.cake.price_id,
                        active=False,
                    )
                else:
                    # Price not changed
                    stripe.Product.modify(
                        self.cake.product_id,
                        default_price=self.cake.price_id
                    )
            else:
                # Create a new product in Stripe
                product = stripe.Product.create(
                    name=f"{self.cake.name} - {self.size}",
                    description=f"Cake variant: {self.size}",
                    active=self.active,
                )
                self.cake.product_id = product.id

                # Create the price
                price = stripe.Price.create(
                    product=product.id,
                    unit_amount=int(self.price * 100),
                    currency='aud',
                )
                self.cake.price_id = price.id

                # Make price the default price
                stripe.Product.modify(
                    self.cake.product_id,
                    default_price=price.id
                )

            super().save(*args, **kwargs)

        except stripe.error.StripeError as e:
            # Handle the Stripe API error
            raise ValidationError(f"Failed to update Stripe product: {str(e)}")

    def delete(self, *args, **kwargs):
        # Delete on stripe:
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            stripe.Product.modify(
                self.cake.product_id,
                active=False,
            )
        except stripe.error.InvalidRequestError as e:
            if e.code == "resource_missing":
                # The product does not exist in Stripe, so it's considered deleted
                pass
            else:
                # Handle any other errors that occur during the API request
                raise ValidationError(f"Failed to delete Stripe product: {str(e)}")
        except stripe.error.StripeError as e:
            # Handle any other errors that occur during the API request
            raise ValidationError(f"Failed to delete Stripe product: {str(e)}")

        super().delete(*args, **kwargs)

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
        
    class Meta:
        verbose_name_plural = "Slider Images"


class AboutUs(models.Model):
    content = models.TextField()
    picture = models.ImageField(upload_to="about_us_page/")
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


class FAQQuestion(models.Model):
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
        
    class Meta:
        verbose_name_plural = "Gallery Items"


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
        return f"welcome/{filename}"
    
    def upload_to_banner(instance, filename):
        return f"banner/{filename}"

    quote = models.TextField()
    banner = models.ImageField(upload_to=upload_to_banner)
    heading = models.TextField()
    paragraph = models.TextField()
    image = models.ImageField(upload_to=upload_to_welcome)

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)

    def __str__(self):
        return "Section Content"

    class Meta:
        verbose_name_plural = "Homepage Top & Welcome Section"


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

    active = models.BooleanField(default=True)
    product_id = models.CharField(max_length=100, blank=True, editable=False)
    price_id = models.CharField(max_length=100, blank=True, editable=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            if self.product_id:
                # Product is being modified
                stripe_product = stripe.Product.retrieve(self.product_id)
                stripe_price = stripe.Price.retrieve(stripe_product.default_price)

                # Price changed or not
                if ((self.price * 100) != stripe_price.unit_amount):
                    # Price changed

                    price = stripe.Price.create(
                        product= self.product_id,
                        unit_amount=int(self.price * 100),
                        currency='aud',
                    )
                
                    stripe.Product.modify(
                        self.product_id,
                        name=self.title,
                        description= self.description,
                        active = self.active,
                        default_price= price.id
                    )

                    stripe.Price.modify(
                        self.price_id,
                        active=False,
                    )
                else:
                    # Price not changed
                    stripe.Product.modify(
                        self.product_id,
                        name=self.title,
                        description= self.description,
                        active = self.active,
                    )
            else:
                # Create a new coupon in Stripe
                product = stripe.Product.create(
                    name = self.title,
                    description = self.description,
                    active = self.active,
                )
                self.product_id = product.id

                # Create the price
                price = stripe.Price.create(
                    product= product.id,
                    unit_amount=int(self.price * 100),
                    currency='aud',
                )
                self.price_id = price.id

                # Make price default price
                stripe.Product.modify(
                    self.product_id,
                    default_price= price.id
                )

            if self.video:
                # Generate a unique filename based on the title
                filename = f"{slugify(self.title)}.mp4"
                self.video.name = filename  # Save directly to 'videos' folder
            super().save(*args, **kwargs)

        except stripe.error.StripeError as e:
            # Handle the Stripe API error
            raise ValidationError(f"Failed to update Stripe product: {str(e)}")

    def delete(self, *args, **kwargs):
        # Delete on stripe:
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            stripe.Product.modify(
                self.product_id,
                active=False,
            )
        except InvalidRequestError as e:
            if e.code == "resource_missing":
                # The product does not exist in Stripe, so it's considered deleted
                pass
            else:
                # Handle any other errors that occur during the API request
                raise ValidationError(f"Failed to delete Stripe product: {str(e)}")
        except stripe.error.StripeError as e:
            # Handle any other errors that occur during the API request
            raise ValidationError(f"Failed to delete Stripe product: {str(e)}")
        
        # Delete the associated video from the bucket
        if self.video:
            video_path = self.video.name
            default_storage.delete(video_path)
        super().delete(*args, **kwargs)


class UserVideo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    videos = models.ManyToManyField(Video, blank=True)

    def __str__(self):
        return self.user.username

    class Meta:
        ordering = ["user"]
        verbose_name_plural = "User Videos"


class UserFirstOrder(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    madeFirstOrder = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username 

    class Meta:
        ordering = ["user"]
        verbose_name_plural = "User First Orders"


class UserPurchase(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    videos = models.ManyToManyField(Video, blank=True)
    cakes = models.ManyToManyField(Product, blank=True)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    time_submitted = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-time_submitted"]
        verbose_name_plural = "User Purchases"


############################################ Coupons and Promotions ############################################
class StripeCoupon(models.Model):
    name = models.CharField(max_length=50, unique=True, primary_key=True)
    amount_off = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text='You cannot change this field after creating the Coupon.')
    percent_off = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text='You cannot change this field after creating the Coupon.')
    max_redemptions = models.PositiveIntegerField(null=True, blank=True, help_text='You cannot change this field after creating the Coupon.')
    redeem_by = models.DateTimeField(null=True, blank=True, help_text='You cannot change this field after creating the Coupon.')
    stripe_coupon_id = models.CharField(max_length=100, blank=True, editable=False)
    # maybe add applies_to to just allow certain cakes and cupcakes 

    def __str__(self):
        return self.name 

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Stripe Coupons"

    def save(self, *args, **kwargs):
        if self.pk:
            try:
                # Update the promotion code
                original_coupon = StripeCoupon.objects.get(pk=self.pk)
                if (
                    original_coupon.name != self.name
                    or original_coupon.amount_off != self.amount_off
                    or original_coupon.percent_off != self.percent_off
                    or original_coupon.max_redemptions != self.max_redemptions
                    or original_coupon.redeem_by != self.redeem_by
                    or original_coupon.stripe_coupon_id != self.stripe_coupon_id
                ):
                    raise ValidationError(
                        "Cannot update fields other than 'name'",
                        code='restricted_fields'
                    )
            except ObjectDoesNotExist:
                # Coupon object with the given primary key does not exist, so try adding or modifying
                pass

        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            if self.stripe_coupon_id:
                stripe.Coupon.modify(
                    self.stripe_coupon_id,
                    name=self.name
                )
            else:
                redeem_by_aest = None
                if self.redeem_by:
                    # Convert redeem_by to AEST
                    tz_aest = pytz.timezone('Australia/Melbourne')
                    redeem_by_aest = self.redeem_by.astimezone(tz_aest)

                # Create a new coupon in Stripe
                coupon = stripe.Coupon.create(
                    currency='AUD',
                    name=self.name,
                    amount_off=int((self.amount_off) * 100) if self.amount_off else None,  # Convert to cents
                    percent_off=self.percent_off,
                    max_redemptions=self.max_redemptions,
                    redeem_by=int(redeem_by_aest.timestamp()) if redeem_by_aest else None,
                )
                self.stripe_coupon_id = coupon.id

            super().save(*args, **kwargs)
        except stripe.error.StripeError as e:
            # Handle the Stripe API error
            raise ValidationError(f"Failed to update Stripe coupon: {str(e)}")


@receiver(pre_delete, sender=StripeCoupon)
def delete_stripe_coupon(sender, instance, **kwargs):
    if instance.stripe_coupon_id:
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            stripe.Coupon.delete(instance.stripe_coupon_id)
        except InvalidRequestError as e:
            if e.code == "resource_missing":
                # The coupon does not exist in Stripe, so it's considered deleted
                pass
            else:
                # Handle any other errors that occur during the API request
                raise ValidationError(f"Failed to delete Stripe coupon: {str(e)}")
        except stripe.error.StripeError as e:
            # Handle any other errors that occur during the API request
            raise ValidationError(f"Failed to delete Stripe coupon: {str(e)}")

############### Promotion ###############
class StripePromotion(models.Model):
    code = models.CharField(max_length=50, blank=True, unique=True, primary_key=True, help_text='You cannot change this field after creating the promotion.')
    coupon = models.ForeignKey(StripeCoupon, on_delete=models.CASCADE, help_text='You cannot change this field after creating the promotion.') 
    stripe_promotion_id = models.CharField(max_length=100, blank=True, editable=False)
    # Frontend:
    is_displayed = models.BooleanField(default=False)
    display_after = models.IntegerField(default=30, help_text='Set this field to display the popup after the given amount of seconds. (Recommended 30 seconds)')
    only_logged_in_users = models.BooleanField(default=False)
    only_first_purchase_of_user = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.code 

    class Meta:
        ordering = ["code"]
        verbose_name_plural = "Stripe Promotions"

    def save(self, *args, **kwargs):
        if self.pk:
            # Make sure the code, coupon and promotion id arent being changed
            try:
                original_promotion = StripePromotion.objects.get(pk=self.pk)
                if (
                    original_promotion.code != self.code
                    or original_promotion.coupon != self.coupon
                    or original_promotion.stripe_promotion_id != self.stripe_promotion_id
                ):
                    raise ValidationError(
                        "Cannot update fields other than 'is_displayed' or 'description'",
                        code='restricted_fields'
                    )
            except StripePromotion.DoesNotExist:
                # Promotion object with the given primary key does not exist, so try adding or modifying
                pass

        # Either edit is_displayed and description, or create new promotion
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            if not self.stripe_promotion_id:
                # Create a new promotion in Stripe
                if (self.code):
                    stripe_promotion = stripe.PromotionCode.create(
                        code=self.code,
                        coupon=self.coupon.stripe_coupon_id,  # Pass the coupon id
                    )
                else:
                    stripe_promotion = stripe.PromotionCode.create(
                        coupon=self.coupon.stripe_coupon_id,  # Pass the coupon id
                    )
                    self.code = stripe_promotion.code
                self.stripe_promotion_id = stripe_promotion.id

            if self.is_displayed:
                StripePromotion.objects.exclude(pk=self.pk).update(is_displayed=False)

            super().save(*args, **kwargs)

        except stripe.error.StripeError as e:
            # Handle the Stripe API error
            raise ValidationError(f"Failed to update Stripe coupon: {str(e)}")

# There is no delete api for promotion codes

################################################################################################################

