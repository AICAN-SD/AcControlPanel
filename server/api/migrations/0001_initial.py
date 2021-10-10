# Generated by Django 3.2.7 on 2021-10-10 09:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Floors',
            fields=[
                ('FloorId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('FloorName', models.CharField(max_length=200)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Profiles',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('type', models.IntegerField()),
                ('data', models.JSONField(blank=True, null=True)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('RoomId', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True)),
                ('RoomName', models.CharField(max_length=200)),
                ('status', models.BooleanField(default=False)),
                ('floor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.floors')),
            ],
        ),
        migrations.CreateModel(
            name='Machines',
            fields=[
                ('MachineId', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True)),
                ('MachineName', models.CharField(max_length=200)),
                ('MachineType', models.CharField(max_length=100)),
                ('status', models.BooleanField(default=False)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.rooms')),
            ],
        ),
    ]
