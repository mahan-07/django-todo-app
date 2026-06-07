from django.shortcuts import render, redirect
from .forms import AccountDataForm
from django.contrib.auth.forms import UserCreationForm
# Create your views here.

def account_data(request):
    user = request.user
    form = AccountDataForm(instance=user)
    if request.method == 'POST':
        form = AccountDataForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('home')
    context = {"form":form}
    return render(request, "registration/account_data.html", context)

def signup(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    context = {'form':form}
    return render(request, 'registration/signup.html',context)
