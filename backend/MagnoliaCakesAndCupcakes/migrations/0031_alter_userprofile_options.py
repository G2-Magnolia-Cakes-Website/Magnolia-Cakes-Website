# Generated by Django 4.2.4 on 2023-09-28 06:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0030_userprofile'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='userprofile',
            options={'ordering': ['user']},
        ),
    ]