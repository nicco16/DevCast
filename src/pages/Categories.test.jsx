import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import Categories from "./Categories.jsx";

function ExploreLocation() {
  const location = useLocation();
  return <p>Explorando: {location.search}</p>;
}

describe("Categories page", () => {
  it("shows the full category catalog and opens matching episodes", async () => {
    render(
      <MemoryRouter initialEntries={["/categories"]}>
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/explore" element={<ExploreLocation />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByRole("heading", { name: "Categorías" })).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /HTML/ }));

    expect(await screen.findByText("Explorando: ?q=HTML")).toBeInTheDocument();
  });
});
