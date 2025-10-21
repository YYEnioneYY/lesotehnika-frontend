import { Routes, Route, Navigate, Link } from "react-router-dom";
import Admin from "./pages/Admin";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import Tech from "./pages/Tech";
import ContactsPage from "./pages/ContactsPage";
import Product from "./pages/Product";

function Protected({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/admin" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="/product/:idOrSlug" element={<Product />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/table" element={<Protected><AdminPage /></Protected>} />
      </Routes>
    </>
  );
}