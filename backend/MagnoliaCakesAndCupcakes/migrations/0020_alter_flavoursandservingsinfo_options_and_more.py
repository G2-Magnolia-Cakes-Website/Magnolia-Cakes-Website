# Generated by Django 4.2.4 on 2023-09-22 03:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0019_alter_flavoursandservingsinfo_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='flavoursandservingsinfo',
            options={'verbose_name_plural': 'Flavours and Servings Info'},
        ),
        migrations.AlterModelOptions(
            name='socialmedias',
            options={'ordering': ['social_media_platform'], 'verbose_name_plural': 'Social Medias'},
        ),
    ]