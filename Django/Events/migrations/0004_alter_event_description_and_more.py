# Generated by Django 4.2.4 on 2023-08-23 07:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0003_event_normal_price_event_reduce_ticket_info_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(max_length=10000),
        ),
        migrations.AlterField(
            model_name='event',
            name='reduce_ticket_info',
            field=models.CharField(default='Childs (0-12) Students (13-24) Seniors(65+)', max_length=200, null=True),
        ),
    ]