from django.urls import path
from .views import api_shoes

urlpatterns = {
    path('shoes/', api_shoes, name="api_shoes"),
    path('shoes/<int:shoe_id>/', api_shoes, name="api_shoes" )
}
