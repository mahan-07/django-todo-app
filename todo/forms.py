from django import forms
from . models import Todo

class TodoEditForm(forms.ModelForm):
    class Meta:
        model = Todo
        fields = ("title", "description")