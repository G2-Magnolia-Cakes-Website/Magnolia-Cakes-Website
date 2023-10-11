# Generated by Django 4.2.4 on 2023-10-10 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MagnoliaCakesAndCupcakes', '0051_auto_20231010_1436'),
    ]

    operations = [
        migrations.CreateModel(
            name='FAQQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=150)),
                ('answer', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'FAQ Questions',
                'ordering': ['question'],
            },
        ),
        migrations.AlterModelOptions(
            name='faqcategory',
            options={'ordering': ['title'], 'verbose_name_plural': 'FAQ Categories'},
        ),
        migrations.AddField(
            model_name='faqquestion',
            name='category',
            field=models.ManyToManyField(to='MagnoliaCakesAndCupcakes.faqcategory'),
        ),
    ]