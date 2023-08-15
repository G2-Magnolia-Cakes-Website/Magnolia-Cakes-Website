from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class BackendAuthentication(ModelBackend):
    # Custom authentication backend to allow login using email instead of username.

    def authenticate(self, request, username=None, password=None, **kwargs):
        """
        Authenticate the user based on their username and password.
        
        Args:
            request: The request object.
            username: The username provided for authentication.
            password: The password provided for authentication.
        
        Returns:
            User object if authentication succeeds, None if not.
        """
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None
