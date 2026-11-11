import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home.jsx';

describe('Home page guided learning experience', () => {
  it('renders the guided learning hero section for first-time users', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Continuar tu viaje de aprendizaje/i)).toBeInTheDocument();
  });
});
