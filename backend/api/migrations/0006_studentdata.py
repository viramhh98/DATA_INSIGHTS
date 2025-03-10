# Generated by Django 5.1 on 2024-08-31 03:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_school'),
    ]

    operations = [
        migrations.CreateModel(
            name='Studentdata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('studentName', models.CharField(max_length=100)),
                ('gender', models.CharField(max_length=100)),
                ('City_type', models.CharField(max_length=100)),
                ('School_name', models.CharField(max_length=100)),
                ('School_medium', models.CharField(max_length=100)),
                ('School_std', models.CharField(max_length=100)),
                ('ParentOccupation', models.CharField(max_length=100)),
                ('ParentMaritalStatus', models.CharField(max_length=100)),
                ('Family_income', models.CharField(max_length=100)),
                ('Cast', models.CharField(max_length=100)),
                ('Disabled', models.CharField(max_length=100)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.district')),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.state')),
                ('taluka', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.taluka')),
            ],
        ),
    ]
