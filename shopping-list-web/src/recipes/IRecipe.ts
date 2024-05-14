import IListItem from "../ListItem/IListItem";

export default interface IRecipe {
  numberOfPortions: number;
  ingredients: IListItem[];
}
