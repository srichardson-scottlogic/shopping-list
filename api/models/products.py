from api.models.product import Product


class Products:
    data = {
        "cheese": {
            "category": "dairy"
        },
        "macaroni": {
            "category": "dried goods"
        }
    }

    def add_product(self, product: Product):
        if product.name in self.data:
            return
        self.data[product.name] = {"category": product.category.lower()} #TODO: Make this more generic

    def get_product_information(self, name):
        if name in self.data:
            return self.data[name.lower()]
