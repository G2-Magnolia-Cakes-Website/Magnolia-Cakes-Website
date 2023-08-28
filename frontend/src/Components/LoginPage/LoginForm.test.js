import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For more assertion methods
import axios from 'axios'; // Mocking axios for API requests
import LoginForm from './LoginForm';

jest.mock('axios'); // Mock axios module


// Unit test: Test the rendering of the login page
test('renders login page without errors', () => {
    render(<LoginForm />);
    expect(console.error).not.toHaveBeenCalled();
});


// Unit test: Changing the value on the inputs, should call the handle methods, which call setEmail or setPassword, and hence, change the value of email and password
test('handles user input events correctly', () => {
    const { getByPlaceholderText } = render(<LoginForm />);
    const usernameInput = getByPlaceholderText('Username');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
});


// Integration test: Hitting the submit button without inputting anything should have the error message show up
test('displays error message for empty email', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const usernameInput = getByPlaceholderText('Email');
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.submit(getByText('Login'));

    expect(getByText('Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.')).toBeInTheDocument();
});

test('displays error message for invalid password', () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.submit(getByText('Login'));

    expect(getByText('Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.')).toBeInTheDocument();
});


// Integration test: Hitting the submit button with a valid username and password should nagivate user to homepage
test('calls authentication API with correct email and password', async () => {
    const { getByPlaceholderText, getByText, history } = render(<LoginForm />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.submit(getByText('Login'));

    mock.onPost('/login').reply(200, { access_token: 'mocked_token', refresh_token: 'mocked_refresh' });

    // Wait for the login request to complete
    await waitFor(() => {
        expect(mock.history.post.length).toBe(1);
    });

    // The sent json to be username and password
    expect(mock.history.post[0].data).toBe(JSON.stringify({ username: 'test@example.com', password: 'testpassword' }));
    
    expect(history.location.pathname).toBe('/');
});