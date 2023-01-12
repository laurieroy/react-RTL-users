import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('shows 2 inputs and a button by default', async () => {
  render(<UserForm />);
  const inputs = await screen.findAllByRole('textbox');
  expect(inputs).toHaveLength(2);

  const button = await screen.findByRole('button',);
  expect(button).toBeInTheDocument();
});

test('calls onUserAdd when the form is submitted', () => {
  const mock = jest.fn();

  render(<UserForm onUserAdd={mock} />);

  const nameInput = screen.getByRole('textbox', {name: /name/i });
  const emailInput = screen.getByRole('textbox', {name: /email/i });
  user.click(nameInput);
  user.keyboard('jane');
  
  user.click(emailInput);
  user.keyboard('jane@example.com');

  const button = screen.getByRole('button');
  user.click(button);
  
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({name: 'jane', email: 'jane@example.com'});
});


