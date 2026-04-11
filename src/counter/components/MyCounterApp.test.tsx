import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe('MyCounterApp', () => {
  test('should render the component', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toBeDefined();
    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('should increment the counter', () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '+1' });

    fireEvent.click(button);

    expect(h1.innerHTML).toContain('Counter: 1');
  });

  test('should decrement the counter when greater than 0', () => {
    render(<MyCounterApp initialValue={2} />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '-1' });

    fireEvent.click(button);

    expect(h1.innerHTML).toContain('Counter: 1');
  });

  test('should not decrement the counter when value is 0', () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const button = screen.getByRole('button', { name: '-1' });

    fireEvent.click(button);

    expect(h1.innerHTML).toContain('Counter: 0');
  });

  test('should reset the counter', () => {
    render(<MyCounterApp />);

    const h1 = screen.getByRole('heading', { level: 1 });
    const incrementButton = screen.getByRole('button', { name: '+1' });
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    fireEvent.click(incrementButton);
    fireEvent.click(resetButton);

    expect(h1.innerHTML).toContain('Counter: 0');
  });
});