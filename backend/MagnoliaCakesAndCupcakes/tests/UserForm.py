from django.test import TestCase
from django.contrib.auth.models import User
from http import HTTPStatus
import json

# Create your tests here.
class UserFormTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Setup run once before all test method.
        pass

    def setUp(self):
        # Setup run before every test method.
        pass

    def test_user_creation_existing_email(self):
        """Test user creation with an existing email"""
        existing_email = "existing@example.com"
        User.objects.create_user(username=existing_email, password="password")

        response = self.client.post(
            "/api/register/", 
            data=json.dumps({"username": existing_email, "first_name": "Test", "last_name": "User", "password1": "fjdikdsfew", "password2": "fjdikdsfew"}), 
            content_type="application/json"
        )

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        json_resp = response.json()
        self.assertEqual(
            json_resp["username"], 
            ["A user with that username already exists."]
        )

    def test_user_creation_invalid_email(self):
        """Test user creation with an invalid email"""
        response = self.client.post(
            "/api/register/", 
            data=json.dumps({"username": "invalid-email", "first_name": "Test", "last_name": "User", "password1": "fjdikdsfew", "password2": "fjdikdsfew"}), 
            content_type="application/json"
        )

        self.assertEqual(response.status_code, HTTPStatus.BAD_REQUEST)
        json_resp = response.json()
        self.assertEqual(
            json_resp["username"], 
            ["Please enter a valid email address."]
        )

    def test_user_creation_valid_email(self):
        """Test user creation with a valid email"""
        response = self.client.post(
            "/api/register/", 
            data=json.dumps({"username": "new@example.com", "first_name": "Test", "last_name": "User", "password1": "fjdikdsfew", "password2": "fjdikdsfew"}), 
            content_type="application/json"
        )

        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        json_resp = response.json()
        self.assertEqual(
            json_resp["message"], 
            "User registered successfully. Please complete verification by clicking the link sent to your email."
        )




    def tearDown(self):
        # Clean up run after every test method.
        User.objects.all().delete()
        pass