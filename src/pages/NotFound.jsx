// src/pages/NotFound.jsx
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[linear-gradient(to_bottom,_#0e0e0e_0%,_#333333_60%,_#0e0e0e_100%)] text-white">
      {/* свечение */}
      <div className="pointer-events-none fixed inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_#FFD700_0%,_transparent_45%)]" />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <section className="relative w-full max-w-3xl rounded-3xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* нижний акцент */}
          <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

          <div className="mb-6">
            <span className="inline-block rounded-2xl border border-white/15 px-3 py-1 text-xs uppercase tracking-wider text-white/70">
              Ошибка 404
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-none">
            4<span className="text-[#FFD700] drop-shadow">0</span>4
          </h1>

          <p className="mt-4 text-white/80 text-lg">
            Страница не найдена. Возможно, ссылка устарела или была удалена.
          </p>
          <p className="text-white/60 text-sm">
            Но у нас есть отличная техника — загляните в каталог 👇
          </p>

          {/* кнопки */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 transition"
            >
              На главную
            </Link>
            <Link
              to="/tech"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-white hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            >
              Каталог техники
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-white/80 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/20 transition"
            >
              Назад
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}