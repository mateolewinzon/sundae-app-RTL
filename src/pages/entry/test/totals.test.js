import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';

test('update scoop subtotal with the correct $ amount when scoops change', async () => {
  render(<Options optionType='scoops' />);

  const scoopSubtotal = screen.getByText('Scoops subtotal: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'})
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput,'1')
  expect(scoopSubtotal).toHaveTextContent('2.00')

  const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput,'2')
  expect(chocolateInput).toHaveTextContent('4.00')
});
