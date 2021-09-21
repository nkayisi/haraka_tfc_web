from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

router.register('question', Question_view, basename='question')
router.register('response', Response_view, basename='response')
router.register('course', Course_view, basename='course')
router.register('evaluation', Evaluation_view, basename='evaluation')
router.register('comments', Comment_view, basename='comments')

router.register('student', Student_view, basename='student')
router.register('teacher', Teacher_view, basename='teacher')
router.register('faculty', Faculty_view, basename='faculty')
router.register('promotion', Promotion_view, basename='promotion')

urlpatterns = [
    path('', include(router.urls)),
    path('total-response-values/', Total_response_value.as_view(), name="total"),
    # path('params/', CourseListView.as_view(), name='params'),
]
