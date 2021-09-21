from django.db import models
from django.db.models import fields

from django.urls import reverse

# Create your models here.

class Faculty(models.Model):
    fac_label = models.TextField(max_length=50, verbose_name="Nom de la faculté")

    def __str__(self):
        return self.fac_label

    
class Promotion(models.Model):
    label = models.TextField(max_length=50, verbose_name="Nom de la promotion")

    def __str__(self):
        return self.label

class Student(models.Model):
    matricule = models.CharField(max_length=50)
    faculty = models.ForeignKey(Faculty, verbose_name="Faculté", on_delete=models.CASCADE)
    promotion = models.ForeignKey(Promotion, verbose_name="Promotion", on_delete=models.CASCADE)

    def __str__(self):
        return self.matricule


class Teacher(models.Model):

    STATUS = (
        ('Permanant', 'Permanant'),
        ('Visiteur', 'Visiteur'),
    )

    QUALIFICATION = (
        ('Assistant 1', 'Assistant 1'),
        ('Assistant 2', 'Assistant 2'),
        ('Chef des travaux', 'Chef des travaux'),
        ('Profésseur', 'Profésseur'),
    )
    
    full_name = models.CharField(max_length=70, verbose_name="Nom complet de l'enseignant", blank=True)
    qualification = models.CharField(max_length=30, choices=QUALIFICATION, verbose_name="Qualité de l'enseignant", blank=True)
    status = models.CharField(max_length=20, choices=STATUS, verbose_name="Statut de l'enseignant", blank=True)

    def __str__(self):
        return self.full_name


class Course(models.Model):
    label = models.CharField(max_length=50, verbose_name="Titre du cours")
    hours = models.IntegerField(verbose_name="Nombre d'heures")
    faculty = models.ForeignKey(Faculty, verbose_name="Faculté", on_delete=models.CASCADE)
    promotion = models.ForeignKey(Promotion, verbose_name="Promotion", on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, verbose_name="Enseignant", on_delete=models.CASCADE, null=True, blank=True)
    evaluated = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True, null=True)

    class Meta:
        ordering = ['-date_added']

    def __str__(self):
        return self.label    


class Question(models.Model):
    question_label = models.TextField(verbose_name='Intitilé de la question')

    def __str__(self):
        return self.question_label


class Response(models.Model):
    label = models.TextField(verbose_name="Intitilé de la reponse")
    value = models.IntegerField(verbose_name="Valeur de la reponse")

    class Meta:
        ordering = ['-value']

    def __str__(self):
        return self.label 

    
class Evaluation(models.Model):
    student = models.ForeignKey(Student, verbose_name="Etudiant", on_delete=models.CASCADE)
    course = models.ForeignKey(Course, verbose_name="course", on_delete=models.CASCADE)
    mark = models.IntegerField()
    date_evaluation = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['date_evaluation']

    def __str__(self):
        return self.course.label


class Comment(models.Model):
    course = models.ForeignKey(Course, verbose_name="course", on_delete=models.CASCADE, blank=True, null=True)
    comment = models.TextField(verbose_name="Commentaire", blank=True, null=True)
    comment_date = models.DateField(verbose_name="Date du commentaire", auto_now_add=True)

    class Meta:
        ordering = ['course']

    def __str__(self):
        return self.course.label
