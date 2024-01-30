from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from .models import *
from django.views.decorators.http import require_http_methods

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["fabric", "style_name", "color", "picture"]




# Create your views here.
@require_http_methods(["GET", "POST", "DELETE"])
def list_hats(request, hat_id=None):

    if request.method == "GET":
        hats = Hat.objects.all()
    elif request.method == "POST":
        content = json.loads(request.body)
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False
        )
    # else:
    #     try:
    #         if hat_id is not None:
    #             hat = Hat.objects.get(id=hat_id)
    #             hat.delete()
    #     except Hat.DoesNotExist:
    #         response = JsonResponse({"message": "Does not exist"})
    #         response.status_code = 404
    #         return response

    return JsonResponse(
        {"hats": hats},
        encoder=HatListEncoder,
        safe=False
    )
