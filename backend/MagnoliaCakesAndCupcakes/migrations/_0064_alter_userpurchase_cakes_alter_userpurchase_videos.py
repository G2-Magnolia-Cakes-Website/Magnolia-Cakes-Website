# Generated by Django 4.2.4 on 2023-10-17 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0063_rename_customer_id_usercustomerid_customer_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpurchase',
            name='cakes',
            field=models.ManyToManyField(blank=True, null=True, to='MagnoliaCakesAndCupcakes.cake'),
        ),
        migrations.AlterField(
            model_name='userpurchase',
            name='videos',
            field=models.ManyToManyField(blank=True, null=True, to='MagnoliaCakesAndCupcakes.video'),
        ),
    ]