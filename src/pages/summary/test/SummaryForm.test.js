import { screen, render, fireEvent } from '@testing-library/react'
import SummaryForm from '../SummaryForm'

describe('Button is enabled and disabled by checkbox', ()=> {
    test('checkbox is unchecked and button is disabled by default', ()=>{
        render(<SummaryForm/>)

        const checkbox = screen.getByRole('checkbox', { name: /Terms and conditions/i})
        expect(checkbox).not.toBeChecked()

        const button = screen.getByRole('button', {name: /Submit/i})
        expect(button).toBeDisabled()
    })

    test('checking and unchecking checkbox enables and disables button', ()=>{
        render(<SummaryForm/>)

        const checkbox = screen.getByRole('checkbox', {name: /Terms and conditions/i})
        const button = screen.getByRole('button', {name: /Submit/i})

        fireEvent.click(checkbox)

        expect(button).toBeEnabled()

        fireEvent.click(checkbox)

        expect(button).toBeDisabled()

    })

})