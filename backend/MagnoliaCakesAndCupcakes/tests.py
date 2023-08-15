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

    def test_user_creation(self):
        """User is successfully created"""
        response = self.client.post(
            "/api/register/", 
            data=json.dumps({"username":"testName", "email":"email@email.com", "first_name":"test", "last_name":"last", "password1":"fjdikdsfew", "password2":"fjdikdsfew"}), 
            content_type="application/json"
        )

        json_resp = response.json()

        # print("json", json_resp["message"])
        # print("response.status_code", response.status_code)
        # print("HTTPStatus.CREATED", HTTPStatus.CREATED)

        self.assertEqual(response.status_code, HTTPStatus.CREATED)
        # self.assertContains(
        #     json_resp["message"], 
        #     "User registered successfully. Please complete verification by clicking the link sent to your email."
        # )

    def tearDown(self):
        # Clean up run after every test method.
        pass