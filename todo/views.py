from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Todo
from django.http import JsonResponse
from django.utils.html import escape
from .forms import TodoEditForm
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

def taggle_soft_delete(request):
    if request.method != "POST":
        return JsonResponse({"error":"POST required"}, status=405)
    
    todo_id = request.POST.get('todo_id')
    todo = get_object_or_404(Todo, id=todo_id)

    todo.is_soft_deleted = True
    todo.save()
    return JsonResponse({"status":"ok"})

def edit(request, pk):
    todo = get_object_or_404(Todo, pk = pk)
    form = TodoEditForm(instance=todo)
    if request.method == "POST":
        form = TodoEditForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()
            return redirect("home")
    context = {'form':form}
    return render(request, "edit.html", context)