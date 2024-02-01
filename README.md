# Wardrobify

    Team:
    These are the people working on the project:
    * Brittany Robarge - Shoes
    * Gary Burns - Hats

## How to Run this App
    Upon making sure docker and docker-compose are both installed and present, run -
    `docker volume create two-shot-pgdata`
    This creates the volume for docker to use to hold our image.
    To create the image -
    `docker-compose build`
    Finally, to start the containers from the image -
    `docker-compose up`

    Now,to access the React frontend to manipulate our data, open a browser and navigate to -
    `http://localhost:3000/`

## Design

## Shoes microservice

    Explain your models and integration with the wardrobe
    microservice, here.
    Shoe model = manufacturer, model name, color, photo url and bin
    poller= bin data for wardrobe

## Hats microservice

    Explain your models and integration with the wardrobe
    microservice, here.

    The Hats microservice utilizes the Location model from the Wardrobe project folder, in the wardrobe_api app. It uses the poller.py in the hats app, in hats/poll, which fetches all instances of Location from the wardrobe project, and creates LocationVOs based on those locations. Then, we use those LocationVOs to attach to our new hats upon creation to assign them to a location.
