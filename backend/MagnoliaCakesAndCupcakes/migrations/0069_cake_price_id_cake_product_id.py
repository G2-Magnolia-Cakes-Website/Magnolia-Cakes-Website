# Generated by Django 4.2.4 on 2023-10-17 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0068_alter_cake_cake_alter_product_product_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='cake',
            name='price_id',
            field=models.CharField(blank=True, editable=False, max_length=100),
        ),
        migrations.AddField(
            model_name='cake',
            name='product_id',
            field=models.CharField(blank=True, editable=False, max_length=100),
        ),
    ]
