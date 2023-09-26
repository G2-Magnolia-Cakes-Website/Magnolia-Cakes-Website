# Generated by Django 4.2.4 on 2023-09-26 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0025_merge_20230926_1007'),
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('description', models.TextField()),
                ('video', models.FileField(upload_to='videos/')),
            ],
        ),
        migrations.AlterField(
            model_name='contactusemail',
            name='your_email',
            field=models.CharField(help_text='This will be the email that receives Contact Us and Get A Quote submissions.', max_length=200),
        ),
    ]