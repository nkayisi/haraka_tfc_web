from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import logout

from .forms import UserRegisterForm
from django.contrib.auth.models import User

# Create your views here.

def home(request):
    return render(request, 'users/pages/home.html')


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created! You are now able to log in.')
            return redirect('login')
    else:
        form = UserRegisterForm()

    return render(request, 'users/pages/register.html', {'form': form})


@login_required
def profile(request):
    return render(request, 'users/pages/profile.html')

@login_required
def logOut(request):
    logout(request)
    return redirect('home')
