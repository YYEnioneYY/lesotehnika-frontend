// src/components/NavBar.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/icons/logo.png";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Главная" },
    { to: "/tech", label: "Техника" },
    { to: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent backdrop-blur-md">
      <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24 flex h-16 items-center justify-between">
        {/* Логотип слева */}
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="Логотип"
            className="w-auto h-10 object-contain"
          />
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-base font-medium uppercase transition hover:text-[#17E673] ${
                  isActive ? "text-[#17E673]" : "text-[#e5e5e5]"
                }`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Кнопка-гамбургер на мобилке */}
        <button
          className="inline-flex items-center justify-center text-xl font-medium text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Открыть меню"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-1 block h-0.5 w-5 transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
              style={{ background: "currentColor" }}
            />
            <span
              className={`absolute left-0 top-2.5 block h-0.5 w-5 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
              style={{ background: "currentColor" }}
            />
            <span
              className={`absolute left-0 top-4 block h-0.5 w-5 transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
              style={{ background: "currentColor" }}
            />
          </div>
        </button>
      </div>

      {/* Мобильная панель */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-48" : "max-h-0"
        }`}
      >
        <nav className="space-y-1 border-t px-4 py-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-base font-medium uppercase transition hover:text-[#17E673] ${
                  isActive ? "text-[#17E673]" : "text-[#e5e5e5]"
                }`
              }
              end={link.to === "/"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}