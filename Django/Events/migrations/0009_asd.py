# Generated by Django 4.2.4 on 2023-08-28 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0008_remove_event_number_of_participants'),
    ]

    operations = [
        migrations.CreateModel(
            name='asd',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='Events/media/events_img')),
                ('title', models.CharField(max_length=1000)),
            ],
        ),
    ]