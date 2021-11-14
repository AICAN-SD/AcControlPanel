# Generated by Django 3.2.7 on 2021-11-14 18:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Devices',
            fields=[
                ('deviceId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('powerRating', models.IntegerField()),
                ('capacity', models.IntegerField()),
                ('costperunit', models.DecimalField(decimal_places=2, default=6.5, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='Floors',
            fields=[
                ('FloorId', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('FloorName', models.CharField(max_length=200)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Machines',
            fields=[
                ('MachineId', models.CharField(max_length=200, primary_key=True, serialize=False, unique=True)),
                ('MachineName', models.CharField(max_length=200)),
                ('MachineType', models.CharField(max_length=100)),
                ('status', models.BooleanField(default=False)),
                ('startTime', models.CharField(default='00:00', max_length=20)),
                ('endTime', models.CharField(default='00:00', max_length=20)),
                ('floor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.floors')),
            ],
        ),
        migrations.CreateModel(
            name='PowerUsedArrayMonthFloors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('startMonthDate', models.DateField()),
                ('totalPowerMonth', models.JSONField(blank=True, null=True)),
                ('totalPowerUsedFacMonth', models.CharField(max_length=200)),
                ('totalPowerCostFacMonth', models.CharField(max_length=200)),
                ('jsonData', models.JSONField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PowerUsedArrayWeekFloors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('startWeekDate', models.DateField()),
                ('totalPowerWeek', models.JSONField(blank=True, null=True)),
                ('totalPowerUsedFacWeek', models.CharField(max_length=200)),
                ('totalPowerCostFacWeek', models.CharField(max_length=200)),
                ('jsonData', models.JSONField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PowerUsedArrayYearFloors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('startYearDate', models.DateField()),
                ('totalPowerYear', models.JSONField(blank=True, null=True)),
                ('totalPowerUsedFacYear', models.CharField(max_length=200)),
                ('totalPowerCostFacYear', models.CharField(max_length=200)),
                ('jsonData', models.JSONField(blank=True, null=True)),
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
            name='WorkingHoursRooms',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('WH_Room', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Room_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.rooms')),
            ],
        ),
        migrations.CreateModel(
            name='WorkingHoursMachines',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('WH_Machine', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Machine_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.machines')),
            ],
        ),
        migrations.CreateModel(
            name='WorkingHoursFloors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('WH_Floor', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Floor_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.floors')),
            ],
        ),
        migrations.CreateModel(
            name='PowerConsRooms',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('PC_Room', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Room_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.rooms')),
            ],
        ),
        migrations.CreateModel(
            name='PowerConsMachines',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('PC_Machine', models.CharField(max_length=200)),
                ('CostPC_Machine', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Machine_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.machines')),
            ],
        ),
        migrations.CreateModel(
            name='PowerConsFloors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('PC_Floor', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Floor_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.floors')),
            ],
        ),
        migrations.AddField(
            model_name='machines',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.rooms'),
        ),
        migrations.CreateModel(
            name='CostPowerConsRooms',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('CostPC_Room', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Room_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.rooms')),
            ],
        ),
        migrations.CreateModel(
            name='CostPowerConsMachines',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('CostPC_Machine', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Machine_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.machines')),
            ],
        ),
        migrations.CreateModel(
            name='CostPowerConsFloors',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('CostPC_Floor', models.CharField(max_length=200)),
                ('Date_Field', models.DateField()),
                ('Floor_Name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.floors')),
            ],
        ),
    ]
