import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent(){
  const users = [
    {name: 'jane', email: 'jane@jane.com'},
    {name: 'sam', email: 'sam@sam.com'},
  ];
  render(<UserList users={users} />);

  return {
    users,
  }
}

test('shows one line per user', () => {
  renderComponent();

  // const { container } = render(<UserList users={users} />);

  // screen.logTestingPlaygroundURL();
  // add in custom css to tr to be able to select
  // e.g., <tr style="border: 10px solid red; display:block;>
  // This also grabs the header row, no easy way around it
  // const userRows = screen.getAllByRole('row');
  // expect(userRows).toHaveLength(2);

  // eslint-disable-next-line testing-library/no-container
  // const rows = container.querySelectorAll('tbody tr');
  // expect(rows).toHaveLength(2);
  
  const userRows = within(screen.getByTestId('users')).getAllByRole('row');
  expect(userRows).toHaveLength(2);
});

test('shows the correct name and email for each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', {name: user.name});
    const email = screen.getByRole('cell', {name: user.email});

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});