from ui.forms import CommentForm
from evaluation.models import Comment, Evaluation
from django.shortcuts import render

from .forms import CommentForm



# Create your views here.

def index(request):
    form = CommentForm()
    context = {
        'form': form
    }
    return render(request, 'ui/pages/index.html', context)