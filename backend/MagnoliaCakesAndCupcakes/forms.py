from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


# Create your forms here.

class NewUserForm(UserCreationForm):
	email = forms.EmailField(required=True)
	first_name = forms.CharField(max_length=30, required=True)
	last_name = forms.CharField(max_length=30, required=True)
    
	class Meta:
		model = User
		fields = ("username", "email", "first_name", "last_name", "password1", "password2")
	def clean_email(self):
			
			# Custom validation to check if the email is already in use.
			
			email = self.cleaned_data.get('email')
			if User.objects.filter(email=email).exists():
				raise forms.ValidationError("This email address is already in use.")
			return email

	def save(self, commit=True):
		user = super(NewUserForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		user.first_name = self.cleaned_data['first_name']
		user.last_name = self.cleaned_data['last_name']
		if commit:
			user.save()
		return user
