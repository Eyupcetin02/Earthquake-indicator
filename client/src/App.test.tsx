import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navbar and map components', () => {
  const { getByText } = render(<App />);
  const navbarElement = screen.getByText(/Navbar/i);
  expect(navbarElement).toBeInTheDocument();

  const mapElement = screen.getByText(/Map/i);
  expect(mapElement).toBeInTheDocument();
});
