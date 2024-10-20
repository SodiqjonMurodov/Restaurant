from django.db import models


class BaseModel(models.Model):
    objects = models.Manager

    class Meta:
        abstract = True


class Food(BaseModel):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Food'
        verbose_name_plural = 'Foods'


class Category(BaseModel):
    """Food Categories"""
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'


class Menu(BaseModel):
    title = models.CharField(max_length=100)
    category = models.ManyToManyField(Category)
    image = models.ImageField(upload_to='menus')

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Menu'
        verbose_name_plural = 'Menu'
