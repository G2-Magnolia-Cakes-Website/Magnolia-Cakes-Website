# Generated by Django 4.2.4 on 2023-08-25 03:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0006_rename_picture_cake_image_alter_cake_flavor_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cake',
            old_name='image',
            new_name='picture',
        ),
        migrations.AlterField(
            model_name='cake',
            name='flavor',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='cake',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='cake',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
