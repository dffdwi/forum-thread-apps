/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call handleRegister function when register button is clicked
 */

import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput handleRegister={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, 'testname');

    // Assert
    expect(nameInput).toHaveValue('testname');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput handleRegister={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'emailtest@example.com');

    // Assert
    expect(emailInput).toHaveValue('emailtest@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput handleRegister={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call handleRegister function when register button is clicked', async () => {
    // Arrange
    const mockHandleRegister = vi.fn();
    render(<RegisterInput handleRegister={mockHandleRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'testname');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest@example.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockHandleRegister).toBeCalledWith({
      name: 'testname',
      email: 'emailtest@example.com',
      password: 'passwordtest',
    });
  });
});
