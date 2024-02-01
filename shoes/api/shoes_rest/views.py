from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoe, BinVO

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "bin_size","reference_href", "id"]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin",
        "id"
        ]

    encoders = {
        "bin":BinVOEncoder()
    }

@require_http_methods(["GET", "POST", "DELETE"])
def api_shoes(request, shoe_id=None):  
    if request.method == "GET":
        shoes = Shoe.objects.all()
    elif request.method == "POST":
        content = json.loads(request.body)
        print(content)
        try:
            href = content["bin"]
            bin = BinVO.objects.get(reference_href=href)
            print("what is in bin")
            print(bin)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status= 400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
              shoe,
              encoder=ShoeListEncoder,
              safe=False,
        )
    else:
        try:
            if shoe_id is not None:
                shoe = Shoe.objects.get(id=shoe_id)
                shoe.delete()
                
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
        
    return JsonResponse(
        {"shoes": shoes},
        encoder=ShoeListEncoder,
        safe=False,
    )
    