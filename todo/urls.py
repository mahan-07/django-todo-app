from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('taggle_soft_delete', views.taggle_soft_delete, name='taggle_soft_delete'),
    path('edit/<int:pk>/', views.edit, name='edit')
]
