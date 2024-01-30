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
    response = requests.get("http://localhost:8100/api/locations/")
    content = json.loads(response.content)
    for location in content["locations"]:
        LocationVO.objects.update_or_create(
            closet_name=location["closet_name"],
            section_number=location["section_number"],
            shelf_number=location["shelf_number"],
        )

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_locations()
        except Exception as e:
            print(e)
        time.sleep(60)


if __name__ == "__main__":
    poll()
