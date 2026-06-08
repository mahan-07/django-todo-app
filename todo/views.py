from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Todo
# Create your views here.

@login_required
def home(request):
    user = request.user
    todos = user.todos.all()
    context = {"todos": todos}
    return render(request, 'index.html', context)

