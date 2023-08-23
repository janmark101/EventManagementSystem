# Generated by Django 4.2.4 on 2023-08-22 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0002_event_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='normal_price',
            field=models.CharField(default='1', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='reduce_ticket_info',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='reduced_price',
            field=models.CharField(default='1', max_length=30),
            preserve_default=False,
        ),
    ]
