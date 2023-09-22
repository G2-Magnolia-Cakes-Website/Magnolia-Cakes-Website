# Generated by Django 4.2.4 on 2023-09-19 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0013_remove_termsandconditions_content_policy'),
    ]

    operations = [
        migrations.CreateModel(
            name='TermsAndCondition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('policy_name', models.CharField(max_length=100)),
                ('policy_content', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='Policy',
        ),
        migrations.DeleteModel(
            name='TermsAndConditions',
        ),
    ]
