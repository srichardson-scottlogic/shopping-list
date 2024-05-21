import CollapsibleRecipe from "../../CollapsibleComponents/CollapsibleRecipe/CollapsibleRecipe";
import IRecipe from "../../recipes/IRecipe";

export default function RecipeList(props: { recipes: Map<string, IRecipe> }) {
  const listRecipes = Array.from(props.recipes.keys()).map(
    (recipe: string, i: number) => {
      return (
        <CollapsibleRecipe
          key={i}
          recipe={recipe}
          numberOfPortions={props.recipes.get(recipe)!.numberOfPortions}
          items={props.recipes.get(recipe)!.ingredients}
        />
      );
    }
  );
  return listRecipes;
}
