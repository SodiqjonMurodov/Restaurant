# Generated by Django 5.1.2 on 2024-10-20 08:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0002_rename_age_cooks_skill'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='phone',
            field=models.CharField(max_length=13, validators=[django.core.validators.RegexValidator(message='Enter a valid phone number.', regex='^\\+?\\d{9,13}$')]),
        ),
    ]
