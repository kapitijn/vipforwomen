import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CategoryGrid from './CategoryGrid';

// Mock fetch to simulate WooCommerce API response
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: 'Pants', slug: 'pants', count: 1 },
        { id: 2, name: 'Dresses', slug: 'dresses', count: 2 }
      ]),
    })
  ) as jest.Mock;
  // Added missing semicolon above
});

afterAll(() => {
  // @ts-ignore
  global.fetch.mockClear();
  delete global.fetch;
});

describe('CategoryGrid', () => {
  it('renders categories from WooCommerce API', async () => {
    render(<CategoryGrid />);
    await waitFor(() => {
      expect(screen.getByText('Pants')).toBeInTheDocument();
      expect(screen.getByText('Dresses')).toBeInTheDocument();
    });
  });
});
