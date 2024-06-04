from api.models.listItem import ListItem


class ShoppingListItem:
    def __init__(self, category, item: ListItem):
        self.category = category
        self.item = item

    def __init__(self, category, product, amount):
        self.category = category
        self.item = {
            "product": product,
            "amount": amount
        }
