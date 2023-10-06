from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.validators import validate_email
from .models import Video

from MagnoliaCakesAndCupcakes.models import Quote


class NewUserForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)

    class Meta:
        model = User
        fields = ("username", "first_name", "last_name", "password1", "password2")

    def clean_username(self):
        # Custom validation to check if the username (email) is already in use.
        username = self.cleaned_data.get("username")
        # Check if the username (email) is already used as an email address.
        if User.objects.filter(email=username).exists():
            raise forms.ValidationError("This email address is already in use.")
            # Django's built-in EmailValidator:
        try:
            validate_email(username)
        # For some reason my
        except forms.ValidationError:
            raise forms.ValidationError("Please enter a valid email address.")

        return username

    def save(self, commit=True):
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data["username"]
        user.first_name = self.cleaned_data["first_name"]
        user.last_name = self.cleaned_data["last_name"]
        if commit:
            user.save()
        return user


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result


class ContactForm(forms.Form):
    email = forms.CharField(required=True)
    subject = forms.CharField(required=True)
    message = forms.CharField(widget=forms.Textarea, required=True)
    file = MultipleFileField(required=False)


class FlavourServingsForm(forms.Form):
    title = forms.CharField(max_length=100)
    list = forms.Textarea()


class QuoteForm(forms.Form):
    name = forms.CharField(required=True)
    mobile = forms.CharField(required=False)
    email = forms.CharField(required=True)
    product_type = forms.CharField(required=False)
    servings_or_amount = forms.IntegerField(required=True)
    serves = forms.CharField(required=True)
    date_of_event = forms.DateField()
    flavour = forms.CharField(required=False)
    filling = forms.CharField(required=False)

    class Meta:
        model = Quote
        fields = (
            "name",
            "mobile",
            "email",
            "product_type",
            "servings_or_amount",
            "serves",
            "date_of_event",
            "flavour",
            "filling",
        )

    def save(self, commit=True):
        quote = Quote.objects.create()
        quote.name = self.cleaned_data["name"]
        quote.mobile = self.cleaned_data["mobile"]
        quote.email = self.cleaned_data["email"]
        quote.product_type = self.cleaned_data["product_type"]
        quote.servings_or_amount = self.cleaned_data["servings_or_amount"]
        quote.serves = self.cleaned_data["serves"]
        quote.date_of_event = self.cleaned_data["date_of_event"]
        quote.flavour = self.cleaned_data["flavour"]
        quote.filling = self.cleaned_data["filling"]

        if commit:
            quote.save()
        return quote
