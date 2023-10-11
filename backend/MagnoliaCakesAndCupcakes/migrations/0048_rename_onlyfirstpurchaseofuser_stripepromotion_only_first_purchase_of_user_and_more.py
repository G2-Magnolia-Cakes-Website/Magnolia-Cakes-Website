# Generated by Django 4.2.4 on 2023-10-09 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0047_stripepromotion_onlyfirstpurchaseofuser'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stripepromotion',
            old_name='onlyFirstPurchaseOfUser',
            new_name='only_first_purchase_of_user',
        ),
        migrations.RenameField(
            model_name='stripepromotion',
            old_name='onlyLoggedInUsers',
            new_name='only_logged_in_users',
        ),
        migrations.AddField(
            model_name='stripepromotion',
            name='display_after',
            field=models.IntegerField(default=30, help_text='Set this field to display the popup after the given amount of seconds. (Recommended 30 seconds)'),
        ),
    ]