import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UrlConverter from './UrlConverter';

test('renders without crashing', () => {
  render(<UrlConverter />);
  expect(screen.getByText(/Enter Dropbox Video URL:/i)).toBeInTheDocument();
});

test('validates and converts URL correctly', () => {
  render(<UrlConverter />);

  const input = screen.getByLabelText(/Enter Dropbox Video URL:/i);
  fireEvent.change(input, { target: { value: 'https://www.dropbox.com/s/testvideo?dl=0' } });

  const button = screen.getByText(/Convert/i);
  fireEvent.click(button);

  expect(screen.getByText(/Converted URL:/i)).toBeInTheDocument();
  expect(screen.getByText(/dl.dropboxusercontent.com\/s\/testvideo/i)).toBeInTheDocument();
});

test('shows error for invalid URL', () => {
  render(<UrlConverter />);

  const input = screen.getByLabelText(/Enter Dropbox Video URL:/i);
  fireEvent.change(input, { target: { value: 'https://example.com' } });

  const button = screen.getByText(/Convert/i);
  fireEvent.click(button);

  expect(screen.getByText(/Invalid Dropbox URL. Please enter a valid URL./i)).toBeInTheDocument();
});
