from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from MagnoliaCakesAndCupcakes.models import Cake
from MagnoliaCakesAndCupcakes.serializers import CakeSerializer
from django.core.files.uploadedfile import SimpleUploadedFile
from moto import mock_s3
import boto3

class CakesListViewTestCase(TestCase):
    def setUp(self):
        # Create a mock S3 bucket
        with mock_s3():
            # Create test data with specific image file names
            self.cake1 = Cake.objects.create(
                name="Cake 1",
                price=10.99,
                description="Delicious cake 1",
                picture="cakes/cake1.png"  # Use the specific file name
            )
            self.cake2 = Cake.objects.create(
                name="Cake 2",
                price=12.99,
                description="Yummy cake 2",
                picture="cakes/cake2.png"  # Use the specific file name
            )
            self.client = APIClient()

    def test_cakes_list_view(self):
        # Make a GET request to the cakes_list view
        response = self.client.get('/api/cakes/')

        # Check if the response status code is 200 (OK)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Serialize the cakes data
        cakes = Cake.objects.all()
        serializer = CakeSerializer(cakes, many=True)

        # Compare the response data and serialized data without the 'image' field
        response_data = self.remove_picture_field(response.data)
        serialized_data = self.remove_picture_field(serializer.data)

        # Ensure that both lists match
        self.assertEqual(response_data, serialized_data)
    
    def tearDown(self):
        # Clean up test data
        if hasattr(self.cake1, 'picture') and self.cake1.picture:
            self.delete_image_from_s3('cake-products', self.cake1.picture.name)
        self.cake1.delete()

        if hasattr(self.cake2, 'picture') and self.cake2.picture:
            self.delete_image_from_s3('cake-products', self.cake2.picture.name)
        self.cake2.delete()

    def delete_image_from_s3(self, bucket_name, file_key):
        try:
            # Initialize a boto3 S3 client
            s3 = boto3.client('s3')

            # Delete the file from the S3 bucket
            s3.delete_object(Bucket=bucket_name, Key=file_key)

            print(f"Deleted file '{file_key}' from S3 bucket '{bucket_name}'")
        except Exception as e:
            print(f"Error deleting file from S3: {e}")

    def remove_picture_field(self, data):
        # Remove the 'image' field from a list of data dictionaries
        return [{k: v for k, v in item.items() if k != 'image'} for item in data]

