import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import OnlineStore from './OnlineStore';

jest.mock('axios');

describe('OnlineStore Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('renders component with cake data', async () => {
    const mockApiResponse = [
      {
        id: 1,
        name: 'Cake 1',
        price: 10.99,
        flavor: 'Vanilla',
        description: 'Delicious cake',
        image: 'cake1.jpg',
      },
      {
        id: 2,
        name: 'Cake 2',
        price: 12.99,
        flavor: 'Chocolate',
        description: 'Yummy cake',
        image: 'cake2.jpg',
      },
    ];

    const mock = new MockAdapter(axios);
    mock.onGet('api/cakes/').reply(200, mockApiResponse);

    render(<OnlineStore api={axios} />);

    await waitFor(() => {
      expect(screen.getByText('Cake 1')).toBeInTheDocument();
      expect(screen.getByText('Cake 2')).toBeInTheDocument();
      expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
      expect(screen.getByText('Price: $12.99')).toBeInTheDocument();
    });
  });

  it('handles API error gracefully', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('api/cakes/').reply(500, { error: 'API error' });

    render(<OnlineStore api={axios} />);

    await waitFor(() => {
      expect(screen.getByText('Error fetching cakes: API error')).toBeInTheDocument();
    });
  });
});
