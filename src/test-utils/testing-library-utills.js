import {render} from '@testing-library/react'
import { OrderDetailsProvider } from '../context/OrderDetails'

const renderWithContext = (ui, options) => render(ui, {wrapper: OrderDetailsProvider, ...options})

//this file will replace the default rtl export from the module 

export * from '@testing-library/react'

export {renderWithContext as render}