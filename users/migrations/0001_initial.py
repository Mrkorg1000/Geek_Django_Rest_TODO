# Generated by Django 4.0 on 2022-01-14 13:28

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('uuid', models.UUIDField(default=uuid.UUID('6c677401-a1ce-446d-aab2-deaad1b44017'), primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=64)),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('birthday_year', models.PositiveIntegerField()),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
    ]
