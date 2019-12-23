from django.db import models


class Category(models.Model):
    """
    Category model, this has a tree structure using the parent foreign key.
    The name is unique. This will be shown as a bread crumbs in the frontend
    """

    name = models.CharField(max_length=250, unique=True, help_text="The name of the product and the name should be unique")
    parent_category = models.ForeignKey('Category', null=True, on_delete=models.CASCADE, help_text="This can be null")
    date_created  = models.DateTimeField(auto_now_add=True, help_text="This is when it was created ")
    date_modified = models.DateTimeField(auto_now=True, help_text="This is when we modified")

    def __str__(self):
        """Returns the name of the category"""
        return self.name

    def get_breadcrumbs(self):
        """Returns the list of categories in order of inheritence"""
        breadcrumbs = []
        category = self
        while category.parent_category is not None:
            breadcrumbs.append(category.name)
            category = category.parent_category
        breadcrumbs.append(category.name)
        breadcrumbs.reverse()
        return breadcrumbs


class Brand(models.Model):
    """
    Created a brand model. This stores all the brands of the product.
    This is unique
    """
    name = models.CharField(max_length=250, unique=True, help_text="The name of the brand, this is unique")
    date_created = models.DateTimeField(auto_now_add=True, help_text="This is when it was created ")
    date_modified = models.DateTimeField(auto_now=True, help_text="This is when we modified")

    def __str__(self):
        """Returns the brand name"""
        return self.name


class Product(models.Model):
    """
    This holds the product and it is unique.
    This includes brand and category, which is unique.
    The product has multiple specifications.
    """
    name = models.CharField(max_length=250, unique=True, help_text="The product name and is unique")
    brand = models.ForeignKey(Brand, help_text="The Brand the product belongs to", on_delete=models.CASCADE)
    category = models.ForeignKey(Category, help_text="The category the product belongs to", on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, help_text="This is when it was created ")
    date_modified = models.DateTimeField(auto_now=True, help_text="This is when we modified")

    def __str__(self):
        """Returns the name of the product"""
        return self.name


class Specification(models.Model):
    """
    Specification of the particular product which has a key, value and unit if exists.
    """
    key = models.CharField(max_length=250, help_text="The Key for the specification, e.g:")
    value = models.CharField(max_length=250, help_text="The value for the specification, e.g:")
    unit = models.CharField(max_length=250,null=True, blank=True, help_text="The unit for the specification, eg:")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, help_text="The specification for the particular product")
    date_created = models.DateTimeField(auto_now_add=True, help_text="This is when it was created ")
    date_modified = models.DateTimeField(auto_now=True, help_text="This is when we modified")

    def __str__(self):
        """Returns the key, value and unit(if it exists)"""
        return self.key+': '+self.value+(' '+self.unit if self.unit else ' ')
