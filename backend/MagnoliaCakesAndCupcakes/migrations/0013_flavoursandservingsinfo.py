# Generated by Django 4.2.4 on 2023-09-15 05:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0012_merge_20230915_0452'),
    ]

    operations = [
        migrations.CreateModel(
            name='FlavoursAndServingsInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('heading', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('extra_points', models.TextField()),
            ],
        ),
    ]