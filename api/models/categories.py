class Categories: #TODO: Are these needed?
    list = ["dairy", "dried goods"]

    def add_category(self, category):
        if category.lower() not in self.list:
            self.list.append(category.lower())
