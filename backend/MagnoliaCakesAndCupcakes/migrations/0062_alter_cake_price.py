# Generated by Django 4.2.4 on 2023-10-16 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0061_cake_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cake',
            name='price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10),
        ),
    ]