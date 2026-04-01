import { useState } from 'react';
import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { mockGifs } from './mock-data/gifs.mock';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {

  const [previousTerms, setPreviousTerms] = useState(['jujutsu kaisen']);

  const handleTermsClicked = (term: string) => {
    console.log(term);
  };

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title='Buscador de Gifs'
        description='Descubre y comparte el Gif perfecto'
      />

      {/* Search */}
      <SearchBar
        placeholder='Buscar gifs'
        onQuery={handleSearch}
      />

      {/* Previous Searches */}
      <PreviousSearches
        title='Busquedas previas'
        searches={previousTerms}
        // We only send the reference when the arguments is the same type and same qty
        // We can use (term: string) => handleTermsClicked(term) too
        onLabelClicked={handleTermsClicked}
      />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
