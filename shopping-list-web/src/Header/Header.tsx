import "./Header.css";

type Props = {
  onShoppingListClick: React.MouseEventHandler<HTMLButtonElement>;
  onRecipesClick: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Header({ onShoppingListClick, onRecipesClick }: Props) {
  return (
    <header className="Header">
      <button onClick={onShoppingListClick}>Shopping List</button>
      <button onClick={onRecipesClick}>Recipes</button>
    </header>
  );
}
