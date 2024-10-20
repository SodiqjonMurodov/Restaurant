from django.core.validators import RegexValidator
from django.db import models


class BaseModel(models.Model):
    objects = models.Manager

    class Meta:
        abstract = True


class Booking(BaseModel):
    full_name = models.CharField(max_length=100)
    phone = models.CharField(
        max_length=13,
        validators=[RegexValidator(regex=r'^\+?\d{9,13}$', message="Enter a valid phone number.")]
    )
    email = models.EmailField()
    day = models.DateField()
    time = models.TimeField()
    guests = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.full_name}'

    class Meta:
        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'
