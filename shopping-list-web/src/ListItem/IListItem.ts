export default interface IListItem {
  product: string;
  amount: string;
  category?: string;
  modifyFunctions: {
    delete: () => void;
  };
}
