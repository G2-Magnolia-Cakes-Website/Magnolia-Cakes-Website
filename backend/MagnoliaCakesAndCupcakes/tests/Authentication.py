from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
import json

class AuthenticationTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Setup run once before all test method.
        pass

    def setUp(self):
        # Setup run before every test method.
        self.user = User.objects.create_user(username="testuser", password="password123")
        pass

    def test_login_successful(self):
        response = self.client.post(
            "/api/login/", 
            data=json.dumps({"username": "testuser", "password": "password123"}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        json_resp = response.json()
        self.assertEqual(
            json_resp["message"], 
            "Login successful"
        )

    def test_login_invalid_credentials(self):
        response = self.client.post(
            "/api/login/", 
            data=json.dumps({"username": "testuser", "password": "incorrectpassword"}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        json_resp = response.json()
        self.assertEqual(
            json_resp["message"], 
            "Login failed"
        )


    def test_login_missing_fields(self):
        response = self.client.post(
            "/api/login/", 
            data=json.dumps({"username": "testuser"}),
            content_type="application/json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        json_resp = response.json()
        self.assertEqual(
            json_resp["message"], 
            "Login failed"
        )


    def tearDown(self):
        self.user.delete()
        pass