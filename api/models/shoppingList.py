from api.models.shoppingListItem import ShoppingListItem


class ShoppingList:
    data = {
        "dairy": [{"product": "cheese", "amount": "30g"}],
        "dried goods": [{"product": "macaroni", "amount": "250g"}],
    }

    def add_product_to_list(self, shoppingListItem: ShoppingListItem):
        if shoppingListItem.category in self.data:
            self.data[shoppingListItem.category].append(
                shoppingListItem.item)
        else:
            self.data[shoppingListItem.category] = [shoppingListItem.item]
