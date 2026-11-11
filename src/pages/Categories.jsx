import React, { useEffect, useState } from "react";
import CategoryCard from "../components/home/CategoryCard.jsx";
import PageShell from "../components/layout/PageShell.jsx";
import * as api from "../lib/api.js";

// Página que muestra las categorías o fundamentos principales del aprendizaje.
export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.getCategories().then((items) => mounted && setCategories(items));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <PageShell
      title="Categorías"
      description="Elige un tema y encuentra episodios para avanzar paso a paso."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </PageShell>
  );
}
