from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
import json
from .models import *
from django.views.decorators.http import require_http_methods

class LocationListEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "reference_href"]

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["id", "fabric", "style_name", "color", "picture", "location"]
    encoders={"location": LocationListEncoder()}






# Create your views here.
@require_http_methods(["GET", "POST", "DELETE"])
def list_hats(request, hat_id=None):

    if request.method == "GET":
        hats = Hat.objects.all()
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            href = content["location"]
            print(href)
            location = LocationVO.objects.get(reference_href=href)
            print(location)
            content["location"] = location
            print(content)
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatListEncoder,
            safe=False
        )
    else:
        try:
            if hat_id is not None:
                hat = Hat.objects.get(id=hat_id)
                hat.delete()
                response = JsonResponse({"message": "Deleted successfully"})
                response.status_code = 204
                return response
        except Hat.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

    return JsonResponse(
        {"hats": hats},
        encoder=HatListEncoder,
        safe=False
    )
