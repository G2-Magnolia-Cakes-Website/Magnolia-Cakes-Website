# Generated by Django 4.2.4 on 2023-09-22 05:18

import MagnoliaCakesAndCupcakes.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0022_sliderimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sliderimage',
            name='image',
            field=models.ImageField(upload_to=MagnoliaCakesAndCupcakes.models.SliderImage.upload_to_slider),
        ),
    ]