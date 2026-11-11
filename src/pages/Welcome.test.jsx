import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Welcome from "./Welcome.jsx";
import { getUserName } from "../lib/api.js";

describe("Welcome page", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("asks for a name before continuing", () => {
    render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<p>Inicio listo</p>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Entrar a DevCast/i }));

    expect(screen.getByRole("alert")).toHaveTextContent("Escribe tu nombre para continuar.");
    expect(screen.queryByText("Inicio listo")).not.toBeInTheDocument();
  });

  it("saves the name and continues to the home page", () => {
    render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<p>Inicio listo</p>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Tu nombre"), { target: { value: "  Alex  " } });
    fireEvent.click(screen.getByRole("button", { name: /Entrar a DevCast/i }));

    expect(getUserName()).toBe("Alex");
    expect(screen.getByText("Inicio listo")).toBeInTheDocument();
  });
});
