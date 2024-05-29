from typing import List
from api.models.shoppingListItem import ShoppingListItem


class ShoppingList:
    data = {
        "dairy": [{"product": "cheese", "amount": "30g"}],
        "dried goods": [{"product": "macaroni", "amount": "250g"}],
    }

    def add_products_to_list(self, shoppingListItems: List[ShoppingListItem]):
        for shoppingListItem in shoppingListItems:
            if shoppingListItem.category in self.data:
                self.data[shoppingListItem.category].append(
                    shoppingListItem.item)
            else:
                self.data[shoppingListItem.category] = [shoppingListItem.item]