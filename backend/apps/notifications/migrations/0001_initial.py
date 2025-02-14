# Generated by Django 3.2.25 on 2025-02-14 05:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
                ('message', models.TextField()),
                ('status', models.CharField(choices=[('sent', 'Sent'), ('pending', 'Pending'), ('failed', 'Failed')], default='pending', max_length=20)),
                ('scheduled_time', models.DateTimeField()),
            ],
        ),
    ]
