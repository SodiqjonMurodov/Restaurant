from django.core.validators import RegexValidator
from django.db import models


class BaseModel(models.Model):
    objects = models.Manager

    class Meta:
        abstract = True


class Company(BaseModel):
    name = models.CharField(max_length=100)
    phone = models.CharField(
        max_length=13,
        validators=[RegexValidator(regex=r'^\+?\d{9,13}$', message="Enter a valid phone number.")]
    )
    address = models.CharField(max_length=255)
    coordinate = models.TextField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'


class MediaLinks(BaseModel):
    class Messangers(models.TextChoices):
        EMAIL = 'email', 'Email'
        FACEBOOK = 'facebook', 'Facebook'
        TELEGRAM = 'telegram', 'Telegram'
        INSTAGRAM = 'instagram', 'Instagram'

    messanger = models.CharField(max_length=255, choices=Messangers.choices, default=Messangers.EMAIL)
    link = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='media_links')

    def __str__(self):
        return f'{self.messanger} - {self.link}'

    class Meta:
        verbose_name = 'Social Network Link'
        verbose_name_plural = 'Social Network Links'


class Post(BaseModel):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    media_link1 = models.TextField(blank=True, null=True)
    media_link2 = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Post'
        verbose_name_plural = 'Posts'


class Gallery(BaseModel):
    image = models.ImageField(upload_to='gallery')

    class Meta:
        verbose_name = 'Gallery'
        verbose_name_plural = 'Gallery'


class Cooks(BaseModel):
    full_name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='cooks')
    skill = models.IntegerField()

    def __str__(self):
        return f'{self.full_name}'

    class Meta:
        verbose_name = 'Cook'
        verbose_name_plural = 'Cooks'


class Testimonial(BaseModel):
    full_name = models.CharField(max_length=150)
    image = models.ImageField(upload_to='testimonials')
    description = models.TextField()

    def __str__(self):
        return f'{self.full_name}'

    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'


class Service(BaseModel):
    title = models.CharField(max_length=100)
    subtitle1 = models.CharField(max_length=150)
    subtitle2 = models.CharField(max_length=150, blank=True, null=True)
    description1 = models.TextField()
    description2 = models.TextField(blank=True, null=True)
    description3 = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='services')

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
