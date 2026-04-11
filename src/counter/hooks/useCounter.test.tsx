import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('useCounter', () => {
  // We could take out the renderHook that repeats on each test (except the ones with initial value)
  // but we would have to make something like this
  /*
  let result;

  beforeEach(() => {
    const {result: hookValue} = renderHook(() => useCounter());
    return = hookValue;
  })
  */
  // and so on, make an interface for result so ts doesn't complain but it is more code
  // for us, the value is that the code must be easy to read

  const initialValue = 10;
  const defaultValue = 0;

  test('should initialize with default value of 0', () => {
    // To use a hook we use the renderHook method that gives us the result object
    // that has the returns of the hook inside
    const { result } = renderHook(() => useCounter());

    expect(result.current.counter).toBe(defaultValue);
  });

  test('should initialize with initialValue of 10', () => {
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test('should increment when handleAdd is called', () => {

    const { result } = renderHook(() => useCounter());

    // To use a method of the hook we must encapsulate it inside an act()
    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(defaultValue + 1);
  });

  test('should decrease when handleSubtract is called and value is greater than 0', () => {

    const { result } = renderHook(() => useCounter(initialValue));

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(initialValue - 1);
  });

  test('should not decrease when handleSubtract is called value is 0', () => {

    // Default Value is 0
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(defaultValue);
  });

  test('should reset when value is changed and handleReset is called', () => {

    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.handleAdd();
    });

    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(defaultValue);
  });
});