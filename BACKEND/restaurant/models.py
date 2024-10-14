from django.db import models


class BaseModel(models.Model):
    objects = models.Manager

    class Meta:
        abstract = True


class Category(BaseModel):
    """Food Categories"""
    category_name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.category_name}'

    class Meta:
        verbose_name = 'Food Category'
        verbose_name_plural = 'Food Categories'


class Menu(BaseModel):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=150)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    image = models.ImageField(upload_to='menus')
    price = models.IntegerField()

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Menu'
        verbose_name_plural = 'Menu'


class Ingredients(BaseModel):
    name = models.CharField(max_length=100)
    value = models.CharField(max_length=10)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='ingredients')

    def __str__(self):
        return f'{self.menu}: {self.name} - {self.value}'

    class Meta:
        verbose_name = 'Ingredient'
        verbose_name_plural = 'Ingredients'


class Rating(BaseModel):
    ip_address = models.GenericIPAddressField()
    rating = models.IntegerField()
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='ratings')

    def __str__(self):
        return f'{self.ip_address} - {self.rating}'

    class Meta:
        verbose_name = 'Rating'
        verbose_name_plural = 'Ratings'
        unique_together = ('menu', 'ip_address')


class Company(BaseModel):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=14)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    coordinate = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Company Detail'
        verbose_name_plural = 'Company Details'


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
    body = models.TextField()
    image = models.ImageField(upload_to='posts')
    created_at = models.DateTimeField(auto_now_add=True)

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
    description = models.TextField()
    age = models.IntegerField()
    skill = models.IntegerField()

    def __str__(self):
        return f'{self.full_name}'

    class Meta:
        verbose_name = 'Cook'
        verbose_name_plural = 'Cooks'


class Feedback(BaseModel):
    full_name = models.CharField(max_length=150)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    body = models.TextField()

    def __str__(self):
        return f'{self.full_name}'

    class Meta:
        verbose_name = 'Feedback'
        verbose_name_plural = 'Feedbacks'


class Testimonial(BaseModel):
    name = models.CharField(max_length=150)
    description = models.TextField()
    image = models.ImageField(upload_to='testimonials')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'


class Service(BaseModel):
    title = models.CharField(max_length=100)
    subtitle1 = models.CharField(max_length=150)
    subtitle2 = models.CharField(max_length=150)
    description1 = models.TextField()
    description2 = models.TextField()
    description3 = models.TextField()
    image = models.ImageField(upload_to='services')

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
