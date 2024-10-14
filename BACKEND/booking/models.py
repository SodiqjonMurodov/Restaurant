from django.db import models


class BaseModel(models.Model):
    objects = models.Manager

    class Meta:
        abstract = True


class Table(BaseModel):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    image = models.ImageField(upload_to='tables')
    count = models.IntegerField()
    status = models.BooleanField(default=False)
    price = models.FloatField()

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Table'
        verbose_name_plural = 'Tables'


class Booking(BaseModel):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=14, blank=True, null=True)
    day = models.DateField()
    time = models.TimeField()
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    body = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.full_name}'

    class Meta:
        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'


class Payment(BaseModel):
    card_name = models.CharField(max_length=150)
    card_serial = models.IntegerField()
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.card_name}'

    class Meta:
        verbose_name = 'Payment'
        verbose_name_plural = 'Payments'



