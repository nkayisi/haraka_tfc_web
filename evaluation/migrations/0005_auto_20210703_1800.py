# Generated by Django 3.2.4 on 2021-07-03 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0004_evaluation'),
    ]

    operations = [
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.TextField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.TextField(max_length=50)),
            ],
        ),
        migrations.AlterModelOptions(
            name='course',
            options={'ordering': ['date_added']},
        ),
        migrations.AlterModelOptions(
            name='evaluation',
            options={'ordering': ['date_evaluation']},
        ),
        migrations.AlterModelOptions(
            name='response',
            options={'ordering': ['value']},
        ),
        migrations.AddField(
            model_name='course',
            name='date_added',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='evaluated',
            field=models.BooleanField(default=False),
        ),
    ]