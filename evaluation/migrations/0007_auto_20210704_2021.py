# Generated by Django 3.2.4 on 2021-07-04 20:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('evaluation', '0006_auto_20210703_1804'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=70, verbose_name="Nom complet de l'enseignant")),
                ('qualification', models.CharField(choices=[('Assistant 1', 'Assistant 1'), ('Assistant 2', 'Assistant 2'), ('Chef des travaux', 'Chef des travaux'), ('Profésseur', 'Profésseur')], max_length=30, verbose_name="Qualité de l'enseignant")),
                ('status', models.CharField(choices=[('Permanant', 'Permanant'), ('Visiteur', 'Visiteur')], max_length=20, verbose_name="Statut de l'enseignant")),
            ],
        ),
        migrations.AlterField(
            model_name='course',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='evaluation.faculty', verbose_name='Faculté'),
        ),
        migrations.AlterField(
            model_name='course',
            name='hours',
            field=models.IntegerField(verbose_name="Nombre d'heures"),
        ),
        migrations.AlterField(
            model_name='course',
            name='label',
            field=models.CharField(max_length=50, verbose_name='Titre du cours'),
        ),
        migrations.AlterField(
            model_name='course',
            name='promotion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='evaluation.promotion', verbose_name='Promotion'),
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matricule', models.CharField(max_length=50)),
                ('faculty', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='evaluation.faculty', verbose_name='Faculté')),
                ('promotion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='evaluation.promotion', verbose_name='Promotion')),
            ],
        ),
    ]
