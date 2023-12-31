# Generated by Django 4.2.4 on 2023-10-06 01:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0034_merge_20231002_2258'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuoteRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('mobile', models.CharField(max_length=15)),
                ('email', models.EmailField(max_length=254)),
                ('servings', models.IntegerField()),
                ('serves', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('flavour', models.CharField(max_length=100)),
                ('extra', models.TextField()),
                ('message', models.TextField()),
            ],
        ),
    ]
