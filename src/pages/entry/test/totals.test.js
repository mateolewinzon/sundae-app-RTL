import { render, screen } from '../../../test-utils/testing-library-utills';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../context/OrderDetails';
import Options from '../Options';

test('update scoop subtotal with the correct $ amount when scoops change', async () => {
  render(<Options optionType='scoops' />);

  //Check if subtotal text is rendered with the initial 0.00 amount

  const scoopSubtotal = await screen.findByText('Scoops subtotal: $', { exact: false });
  expect(scoopSubtotal).toHaveTextContent('0.00');

  //Check for vanilla and chocolate scoops input, and if it changes the subtotal to the correct value. 

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'})
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput,'1')
  expect(scoopSubtotal).toHaveTextContent('2.00')

  const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput,'2')
  expect(scoopSubtotal).toHaveTextContent('6.00') //Adding different flavors should add up their amounts
});
