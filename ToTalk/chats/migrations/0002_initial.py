# Generated by Django 5.0.3 on 2024-04-13 11:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chats', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='messages',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='room',
            name='cat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chats.category'),
        ),
        migrations.AddField(
            model_name='messages',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chats.room'),
        ),
    ]
