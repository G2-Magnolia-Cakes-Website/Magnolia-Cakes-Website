# Generated by Django 4.2.4 on 2023-09-25 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0025_alter_aboutus_options_alter_faqcategory_options_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BackupEmail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(help_text='This will be a backup email that receives Contact Us and Get A Quote submissions.', max_length=200)),
            ],
            options={
                'verbose_name_plural': 'Contact Us Backup Emails',
            },
        ),
    ]
