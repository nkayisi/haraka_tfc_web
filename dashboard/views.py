from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from .forms import CourseForm, QuestionForm, ResponseForm, StudentForm, TeacherForm, FacultyForm, PromotionForm

# Create your views here.

@login_required
def get_evaluated_course_dashboard(request):
    course_form = CourseForm()
    teacher_form = TeacherForm()
    context = {
        'course_form': course_form, 'teacher_form': teacher_form
    }
    return render(request, 'dashboard/pages/evaluated-course.html', context)

@login_required
def get_question_response_dashboard(request):
    question_form = QuestionForm()
    response_form = ResponseForm()
    context = {
        'question_form': question_form, 'response_form': response_form
    }
    return render(request, 'dashboard/pages/evaluation.html', context)

@login_required
def get_stat_dashboard(request):
    return render(request, 'dashboard/pages/stat-evaluation.html')

@login_required
def get_comments_dashboard(request):
    return render(request, 'dashboard/pages/comments.html')

@login_required
def get_faculty_and_promotion_dashboard(request):
    fac_form = FacultyForm()
    prom_form = PromotionForm()
    context = {
        'fac_form': fac_form, 'prom_form': prom_form
    }
    return render(request, 'dashboard/pages/fac-prom.html', context)

@login_required
def get_teacher_dashboard(request):
    form = TeacherForm()
    context = {
        'form': form
    }
    return render(request, 'dashboard/pages/teacher.html', context)

@login_required
def get_student_dashboard(request):
    form = StudentForm()
    context = {
        'form': form
    }
    return render(request, 'dashboard/pages/student.html', context)