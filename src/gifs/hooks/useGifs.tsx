import { useRef, useState } from "react";

import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

// We need to declare it outside the function to make it work, but we'll not using it
// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  // To make a chace this won't work because every time the component renders
  // will create a new fresh memory space
  // const gifsCache: Record<string, Gif[]> = {}  

  const handleTermsClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
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

    if (query.length === 0) return;

    if (previousTerms.includes(query)) {
      setGifs(gifsCache.current[query]);
      return;
    }

    setPreviousTerms([query, ...previousTerms.splice(0, 7)]);

    const gifs = await getGifsByQuery(query);

    setGifs(gifs);
    gifsCache.current[query] = gifs;
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
