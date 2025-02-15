import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

from hats_rest.models import LocationVO
# from hats_rest.models import Something

def get_locations():
    response = requests.get("http://wardrobe-api:8000/api/locations/")
    content = json.loads(response.content)
    for location in content["locations"]:
        current_location = LocationVO.objects.update_or_create(
            reference_href = location["href"],
            defaults={"closet_name": location["closet_name"],
                      "shelf_number": location["shelf_number"],
                      "section_number": location["section_number"]},
        )
        print(current_location)

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_locations()
        except Exception as e:
            print("exception")
            print(e)
        time.sleep(60)


if __name__ == "__main__":
    poll()
