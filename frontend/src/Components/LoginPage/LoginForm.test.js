import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For more assertion methods
import axios from 'axios'; // Mocking axios for API requests
import LoginForm from './LoginForm';
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

jest.mock('axios'); // Mock axios module


// Unit test: Test the rendering of the login page
test('renders login page without errors', () => {
    render(
        <BrowserRouter>
            <LoginForm api={axios} />
        </BrowserRouter>
    );
    expect(console.error).not.toHaveBeenCalled();
});


// Unit test: Changing the value on the inputs, should call the handle methods, which call setEmail or setPassword, and hence, change the value of email and password
test('handles user input events correctly', () => {
    const { getByPlaceholderText } = render(
        <BrowserRouter>
            <LoginForm api={axios} />
        </BrowserRouter>
    );
    const usernameInput = getByPlaceholderText('Email');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
});


// Integration test: Hitting the submit button without inputting anything should have the error message show up
test('displays error message for empty email', () => {
    const { getByPlaceholderText, getByText } = render(
        <BrowserRouter>
            <LoginForm api={axios} />
        </BrowserRouter>
    );
    const usernameInput = getByPlaceholderText('Email');
    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.submit(getByText('Login'));

    expect(getByText('Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.')).toBeInTheDocument();
});

test('displays error message for invalid password', () => {
    const { getByPlaceholderText, getByText } = render(
        <BrowserRouter>
            <LoginForm api={axios} />
        </BrowserRouter>
    );
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.submit(getByText('Login'));

    expect(getByText('Login failed! Please enter a correct username and password. Note that both fields may be case-sensitive.')).toBeInTheDocument();
});


// Integration test: Hitting the submit button with a valid username and password should nagivate user to homepage
test('calls authentication API with correct email and password', async () => {
    const { getByPlaceholderText, getByText, history } = render(
        <BrowserRouter>
            <LoginForm api={axios} />
        </BrowserRouter>
    );
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'yellowatch115@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'fjdikdsfew' } });
    fireEvent.submit(getByText('Login'));

    mock.onPost('/login').reply(200, { access_token: 'mocked_token', refresh_token: 'mocked_refresh' });

    // Wait for the login request to complete
    await waitFor(() => {
        expect(mock.history.post.length).toBe(1);
    });

    // The sent json to be username and password
    expect(mock.history.post[0].data).toBe(JSON.stringify({ username: 'yellowatch115@gmail.com', password: 'fjdikdsfew' }));

    expect(history.location.pathname).toBe('/');
});