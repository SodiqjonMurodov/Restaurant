# Generated by Django 5.1.2 on 2024-10-15 04:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('phone', models.CharField(blank=True, max_length=14, null=True)),
                ('day', models.DateField()),
                ('time', models.TimeField()),
                ('body', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Booking',
                'verbose_name_plural': 'Bookings',
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('capacity', models.IntegerField()),
                ('image', models.ImageField(upload_to='tables')),
                ('count', models.IntegerField()),
                ('status', models.BooleanField(default=False)),
                ('price', models.FloatField()),
            ],
            options={
                'verbose_name': 'Table',
                'verbose_name_plural': 'Tables',
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_name', models.CharField(max_length=150)),
                ('card_serial', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='booking.booking')),
            ],
            options={
                'verbose_name': 'Payment',
                'verbose_name_plural': 'Payments',
            },
        ),
        migrations.AddField(
            model_name='booking',
            name='table',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='booking.table'),
        ),
    ]
