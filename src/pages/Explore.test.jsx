import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Explore from './Explore.jsx'

describe('Explore page', () => {
  it('renders filtered results when q param provided', async () => {
    render(
      <MemoryRouter initialEntries={["/explore?q=event"]}>
        <Explore />
      </MemoryRouter>
    )

    const heading = await screen.findByText(/Resultados de Episodios/i)
    expect(heading).toBeInTheDocument()
  })

  it('filters episodes by category learning path', async () => {
    render(
      <MemoryRouter initialEntries={["/explore?q=HTML"]}>
        <Explore />
      </MemoryRouter>
    )

    expect(await screen.findByText('Estructura del documento HTML')).toBeInTheDocument()
    expect(screen.queryByText('¿Qué es CSS?')).not.toBeInTheDocument()
  })

  it('groups episodes by learning theme', async () => {
    render(
      <MemoryRouter initialEntries={["/explore"]}>
        <Explore />
      </MemoryRouter>
    )

    expect((await screen.findAllByText(/Fundamentos de HTML/i)).length).toBeGreaterThan(0)
    expect((await screen.findAllByText(/Fundamentos de CSS/i)).length).toBeGreaterThan(0)
  })

  it('shows HTML before CSS and JavaScript', async () => {
    render(
      <MemoryRouter initialEntries={["/explore"]}>
        <Explore />
      </MemoryRouter>
    )

    const themeHeadings = await screen.findAllByRole('heading', { level: 3 })
    expect(themeHeadings[0]).toHaveTextContent('Fundamentos de HTML')
    expect(themeHeadings[1]).toHaveTextContent('Fundamentos de CSS')
    expect(themeHeadings[2]).toHaveTextContent('Fundamentos de JavaScript')
  })

  it('only enables playback for episodes with an audio file', async () => {
    render(
      <MemoryRouter initialEntries={["/explore"]}>
        <Explore />
      </MemoryRouter>
    )

    expect(
      await screen.findByRole('button', {
        name: /reproducir estructura del documento html/i,
      })
    ).toBeEnabled()
    expect(
      screen.getByRole('button', { name: /qué es css.*audio no disponible/i })
    ).toBeDisabled()
  })
})
