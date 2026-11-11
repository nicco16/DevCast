import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SidebarNav from "./SidebarNav.jsx";

describe("Sidebar navigation active item", () => {
  it("marks only Inicio as active on the home route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SidebarNav />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Inicio" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Categorías" })).not.toHaveAttribute("aria-current");
  });

  it("marks only Categorías as active on its dedicated route", () => {
    render(
      <MemoryRouter initialEntries={["/categories"]}>
        <SidebarNav />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Categorías" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Inicio" })).not.toHaveAttribute("aria-current");
  });
});
