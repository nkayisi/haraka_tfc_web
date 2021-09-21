from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, response
from rest_framework import generics

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response as modelResponse

from rest_framework.generics import ListAPIView


from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from .serializers import *
from .models import *

# Create your views here.


class Course_view(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    
    def get_queryset(self):

        if self.request.query_params:

            if self.request.query_params.get('faculty'):
                faculty = get_object_or_404(Faculty, id=self.request.query_params.get('faculty', None))
            else:
                faculty = None

            if self.request.query_params.get('promotion'):
                promotion = get_object_or_404(Promotion, id=self.request.query_params.get('promotion', None))
            else:
                promotion = None

            if faculty and promotion:
                return Course.objects.filter(faculty=faculty ,promotion=promotion)
            elif faculty and not promotion:
                return Course.objects.filter(faculty=faculty)
            if not faculty and promotion:
                return Course.objects.filter(promotion=promotion)
            else:
                return Course.objects.all()
        else:
            return Course.objects.all()


# class CourseL(APIView):
#     def get(self, request, format=None):
#         courses = Course.objects.all()
#         serializer = CourseSerializer(courses, many=True)
#         return modelResponse(serializer.data)

class Total_response_value(APIView):
    def get(self, request, format=None):
        value = Response.objects.all().first().value
        question_count = Question.objects.all().count()
        total = value*question_count
        return modelResponse(total)


class Question_view(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class Response_view(viewsets.ModelViewSet):
    serializer_class = ResponseSerializer
    queryset = Response.objects.all()


class Evaluation_view(viewsets.ModelViewSet):
    serializer_class = EvaluationSerializer
    
    def get_queryset(self):

        if self.request.query_params:

            if self.request.query_params.get('course'):
                course = get_object_or_404(Course, id=self.request.query_params.get('course', None))
            else:
                course = None

            if self.request.query_params.get('student'):
                student = get_object_or_404(Student, id=self.request.query_params.get('student', None))
            else:
                student = None

            if course and student:
                return Evaluation.objects.filter(course=course, student=student)
            elif course and not student:
                return Evaluation.objects.filter(course=course)
            if not course and student:
                return Evaluation.objects.filter(student=student)
            else:
                return Evaluation.objects.all()
        else:
            return Evaluation.objects.all()


class Comment_view(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()


class Student_view(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()


class Teacher_view(viewsets.ModelViewSet):
    serializer_class = TeacherSerializer
    queryset = Teacher.objects.all()


class Faculty_view(viewsets.ModelViewSet):
    serializer_class = FacultySerializer
    queryset = Faculty.objects.all()


class Promotion_view(viewsets.ModelViewSet):
    serializer_class = PromotionSerializer
    queryset = Promotion.objects.all()
