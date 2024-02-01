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
    Wardrobify is made up of 2 microservices which interact with wardrobe api.
    -**Hats**
    -**Shoes**

    Diagram:
    ![Img](https://i.imgur.com/vnC1q1l.png)

## Shoes microservice/API

    Explain your models and integration with the wardrobe
    microservice, here.

    Shoe model = Shoe (manufacturer, model name, color, photo url and bin) & BinVO(closet name, bin number and bin size)
    Shoe model uses bin api to represent the bin.
    poller= bin data for wardrobe
    Shoe views used model encoders to show properties(GET,POST,DELETE)

## Hats microservice/API

    Explain your models and integration with the wardrobe
    microservice, here.

    The Hats microservice utilizes the Location model from the Wardrobe project folder, in the wardrobe_api app. It uses the poller.py in the hats app, in hats/poll, which fetches all instances of Location from the wardrobe project, and creates LocationVOs based on those locations. Then, we use those LocationVOs to attach to our new hats upon creation to assign them to a location.


## Requests Chart

    +-------------+------------------------+-----------------------------------+
    | HTTP Method | URL                    | Description                       |
    +-------------+------------------------+-----------------------------------+
    | GET         | /shoes/                | Retrieves all shoes               |
    | POST        | /shoes/                | Creates a new shoe                |
    | DELETE      | /shoes/<int:shoe_id>/  | Deletes shoe with specified id    |
    | GET         | /hats/                 | Retrieves all hats                |
    | POST        | /hats/                 | Creates a new hat                 |
    | DELETE      | /hats/<int:hat_id>/    | Deletes hat with specified id     |
    +-------------+------------------------+-----------------------------------+

## How to make JSON requests

  To create a shoe:
        <!-- {
        "manufacturer": "Nike",
        "model_name": "Air Max",
        "color": "Red",
        "photo_url": "http://example.com/shoe.jpg",
        "bin": "/api/bins/1"
        } -->

  To create a hat:
        <!-- {
        "manufacturer": "New Era",
        "model_name": "59Fifty",
        "color": "Blue",
        "photo_url": "http://example.com/hat.jpg",
        "location": "/api/locations/1"
        } -->
