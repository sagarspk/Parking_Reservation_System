# Generated by Django 4.2.2 on 2023-07-10 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0002_alter_controller_user_alter_customer_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='usermodel',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
