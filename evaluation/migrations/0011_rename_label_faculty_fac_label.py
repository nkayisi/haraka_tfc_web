# Generated by Django 3.2.4 on 2021-08-14 09:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0010_question'),
    ]

    operations = [
        migrations.RenameField(
            model_name='faculty',
            old_name='label',
            new_name='fac_label',
        ),
    ]
