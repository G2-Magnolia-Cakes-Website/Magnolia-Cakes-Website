# Generated by Django 4.2.4 on 2023-09-29 03:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0031_alter_flavoursandservings_type'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quote',
            options={'ordering': ['time_submitted', 'name', 'product_type', 'date_of_event', 'flavour', 'filling']},
        ),
        migrations.RenameField(
            model_name='quote',
            old_name='fillings',
            new_name='filling',
        ),
    ]
