# Generated by Django 4.2.4 on 2023-10-18 13:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0072_auto_20231019_0059'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usercakepurchase',
            old_name='cake',
            new_name='cake_variant',
        ),
        migrations.RenameField(
            model_name='userpurchase',
            old_name='cakes',
            new_name='cake_variant',
        ),
        migrations.CreateModel(
            name='UserProductPurchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='MagnoliaCakesAndCupcakes.product')),
                ('user_purchase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='MagnoliaCakesAndCupcakes.userpurchase')),
            ],
        ),
        migrations.AddField(
            model_name='userpurchase',
            name='products',
            field=models.ManyToManyField(blank=True, through='MagnoliaCakesAndCupcakes.UserProductPurchase', to='MagnoliaCakesAndCupcakes.product'),
        ),
    ]
