export type SearchbarProps = {
    inputValue: string;
    searchFunc: (e : React.ChangeEvent<HTMLInputElement>) => void;
  }