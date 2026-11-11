import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import Categories from "./pages/Categories.jsx";
import Bookmarks from "./pages/Bookmarks.jsx";
import Progress from "./pages/Progress.jsx";
import Profile from "./pages/Profile.jsx";
import Welcome from "./pages/Welcome.jsx";
import { getUserName } from "./lib/api.js";

function RequireUser({ children }) {
  const location = useLocation();

  if (!getUserName()) {
    return <Navigate to="/welcome" replace state={{ from: location }} />;
  }

  return children;
}

function WelcomeRoute() {
  return getUserName() ? <Navigate to="/" replace /> : <Welcome />;
}

// Define la estructura principal de rutas de la aplicación.
export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomeRoute />} />
      <Route element={<RequireUser><AppLayout /></RequireUser>}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="categories" element={<Categories />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="progress" element={<Progress />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
