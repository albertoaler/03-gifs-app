import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe('CustomHeader', () => {

  const titleTest = 'Title Test';

  test('should render the title correctly', () => {

    render(<CustomHeader title={titleTest} />);

    expect(screen.getByText(titleTest)).toBeDefined();
  });

  test('should render description when provided', () => {
    const descriptionTest = 'descriptionTest';

    render(<CustomHeader title={titleTest} description={descriptionTest} />);

    expect(screen.getByText(descriptionTest)).toBeDefined();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(descriptionTest);
  });

  test('should not render description when not provided', () => {
    const { container } = render(<CustomHeader title={titleTest} />);

    const divElement = container.querySelector('.content-center');

    const h1 = divElement?.querySelector('h1');
    expect(h1?.innerHTML).toBe(titleTest);

    const paragraph = divElement?.querySelector('p');
    expect(paragraph?.innerHTML).not.toBeUndefined;
  });
});