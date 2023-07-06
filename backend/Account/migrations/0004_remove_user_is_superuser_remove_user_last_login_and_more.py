# Generated by Django 4.2.2 on 2023-07-05 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Account', '0003_alter_user_balance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='user',
            name='last_login',
        ),
        migrations.AlterField(
            model_name='user',
            name='balance',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]