# Generated by Django 5.1.2 on 2024-10-21 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0002_remove_company_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='coordinate',
            field=models.TextField(),
        ),
    ]