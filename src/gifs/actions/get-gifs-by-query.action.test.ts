import { beforeEach, describe, expect, test, vi } from "vitest";
// We use the axios-mock-adapter to mock an axios instance
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from "./get-gifs-by-query.action";
import { giphyApi } from "../api/giphy.api";
// we create an object with the response data from giphy to mock the request
import { giphySearchResponseMock } from "../../../tests/mock/giphy.response.data"

describe('getGifsByQuery', () => {
  // I had to put the consoleErrorSpy outside the test because i still have
  // the console.error logs in the terminal
  const consoleErrorSpy = vi.spyOn(console, 'error')
    .mockImplementation(() => { });

  // We create the axios mock saying we want to mock the giphyApi real instance
  let axiosMock = new AxiosMockAdapter(giphyApi);

  // To reset the axiosMock before every test:
  beforeEach(() => {
    axiosMock = new AxiosMockAdapter(giphyApi);
  })

  // This was using the original function, not the mock
  // test('should return a list of gifs', async () => {
  //   const gifs = await getGifsByQuery('jujutsu')
  //   const [gif1] = gifs

  //   expect(gifs.length).toBe(10);

  //   expect(gif1).toStrictEqual({
  //     // We use expect.any() to especify the data type we are expecting
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     height: expect.any(Number),
  //     width: expect.any(Number),
  //   })

  // })

  // To use a function that returns a promise we can make async the anonymous function
  // for the test
  test('should return a list of gifs', async () => {
    // We use 'onGet' to simulate the endpoint and 'reply' to mock the reply response
    axiosMock.onGet('/search').reply(200, giphySearchResponseMock)

    // Here Vitest is using the mock instead the real api request to evaluate the
    // management and transformation of the data that getGifsByQuery handle
    const gifs = await getGifsByQuery('goku')

    expect(gifs.length).toBe(10);

    // We can create exceptions for every element inside the array of gifs
    gifs.forEach(gif => {
      // We use the typeof unary operator to get the type of the properties
      // and compare it. NOTE: it give us a string with the type written
      // so we need to compare it with a string literal ('string', 'number')
      // instead of the global 'String' or 'Number' constructor functions/types.
      expect(typeof gif.height).toBe('number');
      expect(typeof gif.id).toBe('string');
      expect(typeof gif.title).toBe('string');
      expect(typeof gif.url).toBe('string');
      expect(typeof gif.width).toBe('number');
    })
  })

  test('should return an empty list of gifs if query is empty', async () => {
    axiosMock.resetHandlers();
    axiosMock.restore();

    const gifs = await getGifsByQuery('');

    // TODO: implement an spy to be sure the function isn't called
    expect(gifs.length).toBe(0);
  })

  test('should handle error when the API returns an error', async () => {

    axiosMock.onGet('/search').reply(400, {
      data: {
        message: 'Bad request',
      }
    })

    const gifs = await getGifsByQuery('goku');

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
    expect(consoleErrorSpy.mock.calls[0][0]).toBeInstanceOf(Error);

    // Restore the console.error mock for future tests
    consoleErrorSpy.mockRestore();
    axiosMock.restore();
  })
})