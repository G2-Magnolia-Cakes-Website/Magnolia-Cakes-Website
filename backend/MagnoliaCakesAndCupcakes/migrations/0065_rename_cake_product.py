# Generated by Django 4.2.4 on 2023-10-16 12:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0064_alter_cake_price'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Cake',
            new_name='Product',
        ),
    ]