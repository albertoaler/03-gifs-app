import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';
import { CustomHeader } from './shared/components/CustomHeader';
import { SearchBar } from './shared/components/SearchBar';

import { useGifs } from './gifs/hooks/useGifs';

export const GifsApp = () => {

  const { gifs, previousTerms, handleSearch, handleTermsClicked } = useGifs();

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
