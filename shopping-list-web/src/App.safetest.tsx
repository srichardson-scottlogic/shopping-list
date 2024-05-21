import { describe, it, expect } from "safetest/jest";
import { render } from "safetest/react";

import List from "./ListComponents/List/List";
import IListItem from "./ListItem/IListItem";

// Whole App testing
describe("App", () => {
  it("renders without crashing", async () => {
    const { page } = await render();
    await expect(page.locator("h1")).toHaveText("Shopping List");
  });
});

// Testing List Component
describe("List", () => {
  it("renders without crashing", async () => {
    const itemsMap = new Map<string, IListItem[]>();
    itemsMap.set("dairy", [{ product: "cheese", amount: "30g" }]);

    const { page } = await render(<List list={itemsMap} />);
    await expect(page.locator("text=dairy")).toBeVisible();
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
