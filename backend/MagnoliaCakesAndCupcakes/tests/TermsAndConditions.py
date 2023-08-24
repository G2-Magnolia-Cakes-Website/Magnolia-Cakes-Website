from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from MagnoliaCakesAndCupcakes.models import TermsAndConditions
from django.urls import reverse

class TermsAndConditionsTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.terms = TermsAndConditions.objects.create(content="Sample terms and conditions")

    def test_get_terms_and_conditions(self):
        url = reverse('terms-and-conditions')  # Use the correct view name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], self.terms.content)

    def test_update_terms_and_conditions(self):
        url = reverse('terms-and-conditions')  # Use the correct view name
        updated_content = "Updated terms and conditions"
        data = {'content': updated_content}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Terms & Conditions updated')
        
        # Check if the content is updated in the database
        self.terms.refresh_from_db()
        self.assertEqual(self.terms.content, updated_content)

    def test_invalid_update(self):
        url = reverse('terms-and-conditions')  # Use the correct view name
        data = {'invalid_field': 'Invalid data'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('content', response.data)  # Ensure content validation error is present

    def tearDown(self):
        # Clean up any data created during tests
        self.terms.delete()
