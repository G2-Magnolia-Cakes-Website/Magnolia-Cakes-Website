import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For more assertion methods
import axios from 'axios'; // Mocking axios for API requests
import TermsAndConditions from './TermsAndConditionsPage';

jest.mock('axios'); // Mock axios module

describe('TermsAndConditions', () => {
  it('fetches and displays content correctly', async () => {
    const mockResponse = {
      data: {
        content: '<p>Mocked terms and conditions content</p>',
      },
    };

    axios.get.mockResolvedValue(mockResponse); // Mocking the axios GET request

    const { getByText } = render(<TermsAndConditions api={axios} />);

    await waitFor(() => {
      expect(getByText('Terms & Conditions')).toBeInTheDocument();
      expect(
        getByText('Mocked terms and conditions content')
      ).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API error')); // Mocking API error

    const { getByText } = render(<TermsAndConditions api={axios} />);

    await waitFor(() => {
      expect(getByText('Terms & Conditions')).toBeInTheDocument();
      expect(getByText('Error fetching data:')).toBeInTheDocument();
    });
  });
});
