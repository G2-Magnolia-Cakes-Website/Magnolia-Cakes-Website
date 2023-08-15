from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class NewUserForm(UserCreationForm):
    """
    Custom user registration form extending UserCreationForm.
    Adds an email field and custom save method to save email.
    """
    
    email = forms.EmailField(required=True)
    
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")
    
    def save(self, commit=True):
        """
        Override the save method to also save the email.
        
        Args:
            commit: Whether to commit the changes to the database.
        
        Returns:
            The user object.
        """
        user = super(NewUserForm, self).save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
