from django.forms import ModelForm


from evaluation import models


class FacultyForm(ModelForm):
    class Meta:
        model = models.Faculty
        fields = '__all__'


class PromotionForm(ModelForm):
    class Meta:
        model = models.Promotion
        fields = '__all__'


class CourseForm(ModelForm):
    class Meta:
        model = models.Course
        fields = '__all__'
        exclude = ['evaluated', 'date_added']


class TeacherForm(ModelForm):
    class Meta:
        model = models.Teacher
        fields = '__all__'


class QuestionForm(ModelForm):
    class Meta:
        model = models.Question
        fields = '__all__'


class ResponseForm(ModelForm):
    class Meta:
        model = models.Response
        fields = '__all__'


class StudentForm(ModelForm):
    class Meta:
        model = models.Student
        fields = '__all__'