# Generated by Django 4.0 on 2022-01-15 18:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='uuid',
            field=models.UUIDField(default=uuid.UUID('d8820afa-de66-4324-aa67-a9596cf16617'), primary_key=True, serialize=False),
        ),
    ]
