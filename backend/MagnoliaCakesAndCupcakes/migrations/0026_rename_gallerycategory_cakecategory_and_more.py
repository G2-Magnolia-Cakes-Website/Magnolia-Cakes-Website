# Generated by Django 4.2.4 on 2023-09-27 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0025_merge_20230927_1332'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GalleryCategory',
            new_name='CakeCategory',
        ),
        migrations.AlterField(
            model_name='contactusemail',
            name='your_email',
            field=models.CharField(help_text='This will be the email that receives Contact Us and Get A Quote submissions.', max_length=200),
        ),
    ]