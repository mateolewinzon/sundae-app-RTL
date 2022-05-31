import { render, screen } from '../../../test-utils/testing-library-utills';
import { OrderDetailsProvider } from '../../../context/OrderDetails'

import Options from '../Options'

test('Displays an image for each scoop option from server', async ()=> {
    render(<Options optionType='scoops'/>)

    const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i})
    expect(scoopImages).toHaveLength(2);

    const altTexts = scoopImages.map((e)=>e.alt)
    expect(altTexts).toEqual(['Chocolate scoop','Vanilla scoop'])
})

test('Displays an image for each topping option from server', async ()=> {
    render(<Options optionType='toppings'/>)

    const toppingImages = await screen.findAllByRole('img', {name: /topping/i})
    expect(toppingImages).toHaveLength(3)

    const altTexts = toppingImages.map((e)=>e.alt)
    expect(altTexts).toEqual(['Strawberries topping', 'Caramel topping', 'Chocolate topping'])
})
