# Generated by Django 4.2.4 on 2023-10-18 09:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0070_merge_20231018_1447'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Cake',
            new_name='CakeVariant',
        ),
    ]