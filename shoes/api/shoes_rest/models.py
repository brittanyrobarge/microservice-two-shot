from django.db import models


class BinVO(models.Model):
    reference_href = models.URLField()
    closet_name = models.CharField(max_length=200)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()


class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    picture_url = models.URLField()
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete= models.CASCADE
    )
