# Generated by Django 5.1 on 2024-09-23 03:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_dropoutstudentdata_reason'),
    ]

    operations = [
        migrations.AddField(
            model_name='signup',
            name='role',
            field=models.CharField(choices=[('admin', 'admin'), ('volunteer', 'volunteer'), ('user', 'user')], default='user', max_length=100),
        ),
    ]
