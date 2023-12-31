# Generated by Django 4.2.4 on 2023-09-28 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0028_merge_20230928_0736'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('mobile', models.CharField(max_length=10)),
                ('email', models.CharField(max_length=200)),
                ('product_type', models.CharField(max_length=20)),
                ('servings_or_amount', models.IntegerField()),
                ('serves', models.CharField(max_length=20)),
                ('date_of_event', models.DateField()),
                ('flavour', models.CharField(max_length=30)),
                ('fillings', models.CharField(max_length=30)),
                ('time_submitted', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['time_submitted', 'name', 'product_type', 'date_of_event', 'flavour', 'fillings'],
            },
        ),
    ]
