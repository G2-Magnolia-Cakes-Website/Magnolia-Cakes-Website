# Generated by Django 4.2.4 on 2023-10-19 06:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('MagnoliaCakesAndCupcakes', '0079_merge_20231019_1656'),
    ]

    operations = [
        migrations.AddField(
            model_name='stripepromotion',
            name='minimum_amount',
            field=models.DecimalField(decimal_places=2, default=0.0, help_text='You cannot change this field after creating the Coupon.', max_digits=5),
        ),
        migrations.AlterField(
            model_name='stripepromotion',
            name='only_first_purchase_of_user',
            field=models.BooleanField(default=False, help_text='You cannot change this field after creating the promotion.'),
        ),
        migrations.CreateModel(
            name='UserCustomerID',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_id', models.CharField(blank=True, editable=False, max_length=100)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Stripe Customer ID',
                'ordering': ['user'],
            },
        ),
    ]