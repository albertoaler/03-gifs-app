import { useState, type KeyboardEvent } from "react";

interface Props {
  placeholder: string,
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder, onQuery }: Props) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onQuery(query);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
