import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';

describe('Map component', () => {
  test('renders without crashing', () => {
    render(<Map />);
  });
});
