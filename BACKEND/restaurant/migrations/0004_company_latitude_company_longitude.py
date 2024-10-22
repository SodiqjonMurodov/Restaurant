# Generated by Django 5.1.2 on 2024-10-22 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_alter_company_coordinate'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='latitude',
            field=models.FloatField(default=123),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='company',
            name='longitude',
            field=models.FloatField(default=123),
            preserve_default=False,
        ),
    ]