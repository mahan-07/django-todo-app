from django.urls import path
from . import views

urlpatterns = [
    path('account_data', views.account_data, name="account_data"),
    path('signup', views.signup, name="signup"),
]
