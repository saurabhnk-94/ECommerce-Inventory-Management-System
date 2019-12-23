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