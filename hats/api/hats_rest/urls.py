from django.urls import path

from .views import list_hats

urlpatterns = [
    path("", list_hats, name="list_hats")
]
