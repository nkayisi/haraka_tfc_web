from django.urls import path

from . import views


urlpatterns = [
    path('', views.get_question_response_dashboard, name='dashboard-quesRes'),
    path('course/', views.get_evaluated_course_dashboard, name='dashboard-course'),
    path('stat/', views.get_stat_dashboard, name='dashboard-stat'),
    path('teacher/', views.get_teacher_dashboard, name='teacher'),
    path('student/', views.get_student_dashboard, name='student'),
    path('faculty-and-promotion/', views.get_faculty_and_promotion_dashboard, name='fac-prom'),
    path('comments/', views.get_comments_dashboard, name='comments'),
]
