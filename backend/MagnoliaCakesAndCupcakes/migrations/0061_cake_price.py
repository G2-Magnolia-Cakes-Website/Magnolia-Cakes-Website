# Generated by Django 4.2.4 on 2023-10-16 11:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0060_remove_cake_categories_remove_cake_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cake',
            name='price',
            field=models.DecimalField(decimal_places=2, default='0', max_digits=10),
            preserve_default=False,
        ),
    ]
