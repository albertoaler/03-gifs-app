interface Props {
  placeholder: string;
}

export const SearchBar = ({ placeholder }: Props) => {
  return (
    <div className="search-container">
      <input type="text" placeholder={placeholder} />
      <button>Buscar</button>
    </div>
  );
};
