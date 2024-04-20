import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Navbar from './Navbar';

jest.mock('axios');

describe('Navbar component', () => {
  test('renders input fields and button', () => {
    render(<Navbar />);
    const latInput = screen.getByPlaceholderText('lat');
    const lonInput = screen.getByPlaceholderText('lon');
    const şiddetInput = screen.getByPlaceholderText('şiddet');
    const addButton = screen.getByText('add');

    expect(latInput).toBeInTheDocument();
    expect(lonInput).toBeInTheDocument();
    expect(şiddetInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('updates state when input fields change', () => {
    render(<Navbar />);
    const latInput = screen.getByPlaceholderText('lat');
    const lonInput = screen.getByPlaceholderText('lon');
    const şiddetInput = screen.getByPlaceholderText('şiddet');

    fireEvent.change(latInput, { target: { value: '40.7128' } });
    fireEvent.change(lonInput, { target: { value: '-74.0060' } });
    fireEvent.change(şiddetInput, { target: { value: '5' } });

    expect(latInput).toHaveValue('40.7128');
    expect(lonInput).toHaveValue('-74.0060');
    expect(şiddetInput).toHaveValue('5');
  });
});
