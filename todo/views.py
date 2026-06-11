from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Todo

from django.utils.html import escape

# Create your views here.

@login_required
def home(request):
    user = request.user
    todos = user.todos.filter(is_soft_deleted=False).order_by('-datetime_created')
    if request.method == "POST":
        title = request.POST.get('title').strip()
        title = escape(title)
        if title and len(title) <= 255:
            Todo.objects.create(user = user, title=title,)
            return redirect("home")
            
    context = {"todos": todos}
    return render(request, 'index.html', context)

