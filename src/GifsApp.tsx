import { useState } from 'react';

import type { Gif } from './gifs/interfaces/gif.interface';

import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

import { getGifsByQuery } from './gifs/actions/get-gifs-by-query.action';

export const GifsApp = () => {

  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermsClicked = (term: string) => {
    console.log(term);
  };

  // Here is my propose to the homework:
  /*
  const handleSearch = (query: string) => {
    query = query.toLowerCase().trim();

    if (!queryModified || previousTerms.includes(queryModified) || previousTerms.length >= 8) return;

    setPreviousTerms([queryModified, ...previousTerms]);
  }
  */

  // Here is Fernando's propose
  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0 || previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms.splice(0, 7)]);

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);
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
      <GifList gifs={gifs} />
    </>
  );
};
