import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders currencies page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Currencies/i); 
  expect(linkElement).toBeInTheDocument();
});
