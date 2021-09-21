from django.contrib import admin

from .models import Question, Response, Course, Evaluation, Faculty, Promotion, Student, Teacher, Comment

# Register your models here.

admin.site.register(Question)
admin.site.register(Response)
admin.site.register(Course)
admin.site.register(Evaluation)
admin.site.register(Faculty)
admin.site.register(Promotion)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Comment)

