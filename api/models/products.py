from api.models.product import Product
import re


class Products:
    data = {"cheese": {"category": "dairy"}, "macaroni": {"category": "dried goods"}}

    def add_product(self, product: Product):
        if product.name in self.data:
            return
        self.data[product.name] = {
            "category": product.category.lower()
        }  # TODO: Make this more generic

    def get_product_information(self, name):
        if name in self.data:
            return self.data[name.lower()]

    def get_filtered_products(self, query: str):
        def product_filter(query, product_name):
            regex = "^.*" + ".*".join(query.lower()) + ".*$"
            return bool(re.search(regex, product_name.lower()))

        return {product_name: self.data[product_name] for product_name in self.data if product_filter(query, product_name)}