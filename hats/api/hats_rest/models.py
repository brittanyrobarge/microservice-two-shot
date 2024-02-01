from django.db import models

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    reference_href = models.URLField()

class Hat(models.Model):
    fabric = models.TextField(max_length=200)
    style_name = models.TextField(max_length=200)
    color = models.TextField(max_length=200)
    picture = models.URLField()
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE)
