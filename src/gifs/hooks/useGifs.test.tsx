import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { act } from "react";
// We import everything into the gifActions object so we can use spyOn
import * as gifActions from "../actions/get-gifs-by-query.action";

describe('useGifs', () => {
  test('should return default values and methods', () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermsClicked).toBeDefined();
  });

  // Here WE ARE making an http request because we ain't mocking anything
  test('should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch('jujutsu');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  // Here WE ARE making an http request because we ain't mocking anything
  test('should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermsClicked('naruto');
    });

    expect(result.current.gifs.length).toBe(10);
  });

  // Here WE ARE making an http request because we ain't mocking anything
  test('should return list of gifs from cache', async () => {
    // We create a spy so we can count the calls of the function
    const getGifsByQuerySpy = vi.spyOn(gifActions, 'getGifsByQuery');

    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermsClicked('goku');
    });

    expect(result.current.gifs.length).toBe(10);

    await act(async () => {
      await result.current.handleTermsClicked('goku');
    });

    expect(getGifsByQuerySpy).toHaveBeenCalledOnce();
  });

  // Here we actually don't make an http request thanks to 'mockResolvedValue'
  test('should return no more than 8 previousTerms', async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch('jujutsu1');
      await result.current.handleSearch('jujutsu2');
      await result.current.handleSearch('jujutsu3');
      await result.current.handleSearch('jujutsu4');
      await result.current.handleSearch('jujutsu5');
      await result.current.handleSearch('jujutsu6');
      await result.current.handleSearch('jujutsu7');
      await result.current.handleSearch('jujutsu8');
      await result.current.handleSearch('jujutsu9');
    });

    expect(result.current.previousTerms).toStrictEqual(
      [
        "jujutsu9",
        "jujutsu8",
        "jujutsu7",
        "jujutsu6",
        "jujutsu5",
        "jujutsu4",
        "jujutsu3",
        "jujutsu2",
      ]
    );

  });
});