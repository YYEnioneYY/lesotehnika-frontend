import logo from "../assets/icons/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { to: "/", label: "Главная" },
    { to: "/tech", label: "Техника" },
    { to: "/contacts", label: "Контакты" },
  ];

  return (
    <>
      <div className="py-16 bg-[linear-gradient(to_bottom,_#333333_0%,_#0e0e0e_100%)] content-center border-t border-[#828282]">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/" className="flex items-center justify-center">
              <img
                src={logo}
                alt="Логотип"
                className="w-auto h-10 object-contain"
              />
            </Link>
            <div className="px-8 py-6 flex flex-col items-center justify-center gap-4 text-center">
              <Link to="/" className="text-white font-medium uppercase">Главная</Link>
              <Link to="/tech" className="text-white font-medium uppercase">Техника</Link>
              <Link to="/contacts" className="text-white font-medium uppercase">Контакты</Link>
            </div>
            <div className="px-8 py-6 flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-[#BFBFBF] text-center text-sm md:text-sm lg:text-md">📍 Адрес: г. Санкт-Петербург, Мурино, д.7, к.2 </p>
              <p className="text-[#BFBFBF] text-center text-sm md:text-sm lg:text-md">📞 Телефон: +7 (921) 933-42-28 </p>
              <p className="text-[#BFBFBF] text-center text-sm md:text-sm lg:text-md">✉ Почта: info@lesotehnika.ru </p>
              <p className="text-[#BFBFBF] text-center text-sm md:text-sm lg:text-md">🕒 Время работы: Пн–Пт 9:00–18:00 </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0e0e0e] py-2">
        <p className="text-[#BFBFBF] text-center text-sm md:text-sm lg:text-md">© 2025 Lesotehnika • Все права защищены • Powered by SYNATRA</p>
      </div>
    </>
  );
}