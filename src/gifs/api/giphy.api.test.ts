import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphyApi', () => {
  test('should be configured correctly', () => {
    // We can access to object info with defaults property
    const params = giphyApi.defaults.params;

    // We use toBe to compare primitives
    expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');
    expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_API_KEY);
    expect(params.rating).toBe('g');
    expect(params.lang).toBe('es');

    // We can use toStrictEqual to compare objects
    expect(params).toStrictEqual({
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
      rating: 'g',
      lang: 'es'
    })
  })
})