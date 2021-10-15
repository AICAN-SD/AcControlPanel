# Generated by Django 3.2.8 on 2021-10-14 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Devices',
            fields=[
                ('deviceId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('powerRating', models.IntegerField()),
                ('capacity', models.IntegerField()),
                ('costperunit', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
    ]
