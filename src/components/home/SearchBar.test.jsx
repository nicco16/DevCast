import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import SearchBar from './SearchBar.jsx'

describe('SearchBar', () => {
  it('renders input and updates value', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    )

    const input = screen.getByLabelText('Buscar')
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'event' } })
    expect(input.value).toBe('event')
  })
})
