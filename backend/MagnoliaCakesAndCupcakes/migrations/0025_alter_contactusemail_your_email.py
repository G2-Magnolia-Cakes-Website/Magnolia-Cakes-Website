# Generated by Django 4.2.4 on 2023-09-26 07:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0024_merge_20230923_0430'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contactusemail',
            name='your_email',
            field=models.CharField(help_text='This will be the email that receives Contact Us and Get A Quote submissions.', max_length=200),
        ),
    ]
