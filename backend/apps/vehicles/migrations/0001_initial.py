# Generated by Django 3.2.25 on 2025-02-14 05:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Vehicle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('make', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
                ('year', models.PositiveIntegerField()),
                ('vin', models.CharField(blank=True, max_length=100, null=True)),
                ('license_plate', models.CharField(max_length=20)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='vehicles', to='customers.customer')),
            ],
        ),
    ]
