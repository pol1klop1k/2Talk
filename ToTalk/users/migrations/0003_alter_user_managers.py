# Generated by Django 5.0.3 on 2024-04-20 11:46

import users.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_decency_user'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', users.models.CustomUserManager()),
            ],
        ),
    ]