import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('1 renders without errors', () => {
    render(<ContactForm />);


});

test('2 renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i);
    const h1 = screen.queryByTestId('h1test');
    expect(header).toBeInTheDocument();
    expect(header).toBeVisible();
    expect(header).toHaveTextContent(/contact form/i);
    expect(header).toBeTruthy();
    expect(header).not.toBeFalsy();
    expect(h1).toBeInTheDocument();
    expect(h1).toBeVisible();
});

test('3 renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const firstName = "Ric";
    const firstNameInput = screen.queryByLabelText(/first Name/i);
    userEvent.type(firstNameInput, firstName);//find filed then fill it in

    const errorMessageA = screen.queryAllByText(/error/i); //
    expect(errorMessageA).toHaveLength(1);
    expect(errorMessageA).toBeTruthy();
    //Alternative method
    const errorMessageB = screen.queryByTestId('error');
    expect(errorMessageB).toBeInTheDocument();
    expect(errorMessageB).toBeTruthy();

});

test('4 renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);
    const errorMessagesInDOMA = screen.queryAllByTestId(/error/i);
    expect(errorMessagesInDOMA).toHaveLength(3);
    //alternative
    const errorMessagesInDOMB = screen.queryByText(/Error: firstName must have at least 5 characters/i);
    expect(errorMessagesInDOMB).toBeInTheDocument();
});

test('5 renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    //enters first name
    const firstName = "Ricster";
    const firstNameInput = screen.getByLabelText(/first name/i);
    userEvent.type(firstNameInput, firstName);
    //enters last name
    const lastName = "Mansfield";
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    userEvent.type(lastNameInput, lastName);
    //uses submit button before entering email
    const button = screen.getByRole('button');
    userEvent.click(button);
    //should see error for email
    const errorMessages = screen.queryAllByText(/error/i);
    expect(errorMessages).toHaveLength(1);
    //alternative check for email error message using preestablished variable from test 4
    const emailErrorMessage = screen.queryAllByTestId(/error/i);
    expect(emailErrorMessage).toHaveLength(1);

});

test('6 renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = "fake"; 
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, email);
    const errorMessageA = screen.queryAllByText(/error/i);
    expect(errorMessageA).toHaveLength(1);
    //alternatively
    const errorMessageB = screen.queryByText(/email must be a valid email address/i);
    expect(errorMessageB).toBeVisible();
    
});

test('7 renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

});

test('8 renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

});

test('9 renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

});