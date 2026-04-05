import { useState } from "react";

import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([]);

  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

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

  return {
    // Values
    gifs,
    previousTerms,

    // Methods
    handleTermsClicked,
    handleSearch
  };
};
