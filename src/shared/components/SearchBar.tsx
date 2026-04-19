import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string,
  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder, onQuery }: Props) => {
  const [query, setQuery] = useState('');

  // We will use useEffect to handle a debouncer. We would think we can handle it inside the
  // handleKeyDown function but because of the clean function the hook provides it is easier
  // to implement it here.
  useEffect(() => {
    // To make the debouncer we will use the setTimeOut(()=>{})
    const timeOutId = setTimeout(() => {
      onQuery(query);
    }, 900);

    // The return is a function that executes after the component is dismounted or the
    // effect is executed again because of any dependency changed
    return () => {
      clearTimeout(timeOutId);
    };

  }, [query]);
  // Basically we are creating and destroying the timeout every time the dependencies are
  // modified, and only until the time set is acomplished we execute the onQuery function

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
