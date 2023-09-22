# Generated by Django 4.2.4 on 2023-09-18 01:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0013_footerbusinesshours_footercontactus_footerlocation_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='footerbusinesshours',
            options={'verbose_name_plural': 'Footer Business Hours'},
        ),
        migrations.AlterModelOptions(
            name='footercontactus',
            options={'ordering': ['section_heading'], 'verbose_name_plural': 'Footer Contact Us'},
        ),
        migrations.AlterModelOptions(
            name='footerlocation',
            options={'ordering': ['section_heading'], 'verbose_name_plural': 'Footer Location'},
        ),
        migrations.AlterModelOptions(
            name='socialmedias',
            options={'verbose_name_plural': 'Social Medias'},
        ),
        migrations.RemoveField(
            model_name='socialmedias',
            name='section_heading',
        ),
    ]