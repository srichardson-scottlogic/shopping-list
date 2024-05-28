from api.models.product import Product


class ShoppingListItem:
    def __init__(self, category, item: Product):
        self.category = category
        self.item = item
