from django.urls import path

from .views import list_hats

urlpatterns = [
    path("", list_hats, name="list_hats"),
    path("<int:hat_id>/", list_hats, name="list_hats"),
    path("/new/", list_hats, name="list_hats"),
]
