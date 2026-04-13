import { giphyApi } from '../api/giphy.api';

import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {

  try {
    // We will use axios instead of fetch
    const response = await giphyApi.get<GiphyResponse>('/search', {
      params: {
        q: query,
        limit: 10,
      }
    })

    /* This is the way to use it without creating an instance
    const response = await axios.get<GiphyResponse>('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: import.meta.env.VITE_GIPHY_API_KEY,
        rating: 'g',
        lang: 'en',
        q: query,
        limit: 10,
      }
    })
    */

    // At this point we transform the data given by Giphy into our local business model
    return response.data.data.map((gif) => ({
      id: gif.id,
      title: gif.title,
      url: gif.images.original.url,
      height: Number(gif.images.original.height),
      width: Number(gif.images.original.width),
    }))
  } catch (error) {
    console.error(error);
    return [];
  }


}