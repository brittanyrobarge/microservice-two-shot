from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Shoe, BinVO

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href",]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name"]

    def get_extra_data(self, o):
        return {"bin": o.bin.closet_name}

class ShoeDetailEncoder(ModelEncoder):
     model = Shoe
     properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin"
    ]
encoders = {
        "shoes":BinVOEncoder(),
    }


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_shoes(request, bin_vo_id=None):  
    if request.method == "GET":
            if bin_vo_id is not None:
                 shoe.objects.filter(bin_vo_id=bin_vo_id)
            else:
                shoe = Shoe.objects.all()
            return JsonResponse(
            {"shoes": shoe},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status= 400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
              {"shoe":shoe},
              encoder=ShoeDetailEncoder,
              safe=False,
        )
    
@require_http_methods(["DELETE", "GET", "PUT"])
def api_shoe(request, pk):
    if request.method == "GET":
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False
            )
    else:
        count, _=shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    #     except Shoe.DoesNotExist:
    #         response = JsonResponse({"messgae": "Does not exist"})
    #         response.status_code = 404
    #         return response
    # elif request.method == "DELETE":
    #     try:
    #         shoe = Shoe.objects.get(id=pk)
    #         shoe.delete()
    #         return JsonResponse(
    #             shoe,
    #             encoder=ShoeDetailEncoder,
    #             safe=False,
    #         )
    #     except Shoe.DoesNotExist:
    #         return JsonResponse({"message": "Does not exist"})

    
