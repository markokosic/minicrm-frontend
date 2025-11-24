import { render, screen } from '@testing-library/react';
import { RegisterForm } from '../RegisterForm';

describe('Register Form', () => {
  it('should render all form inputs, tenantName, email, password, firstName, lastName', () => {
    render(<RegisterForm />);

    const tenantName = screen.getByRole('textbox', { name: /tenant/i });
    const firstName = screen.getByRole('textbox', { name: /first/i });
    const lastName = screen.getByRole('textbox', { name: /last/i });
    const email = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/form:password.label/i);
    const confirmPasswordInput = screen.getByLabelText(/form:confirmPassword.label/i);

    expect(tenantName).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });
});

//Testen happy path schauen ob handleSubmit aufgerufen wird

//leere validierungsfehler testen, passwort missmatch etc
