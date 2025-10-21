// src/pages/Admin.jsx
import { useMemo, useState } from "react";
import { login } from "../api";

/** Анимированный фон с «точками/снежинками» */
function Particles({ count = 60 }) {
  // Генерируем параметры точек 1 раз
  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = Math.random() * 3 + 2;              // 2–5 px
        const left = Math.random() * 100;                // %
        const duration = Math.random() * 12 + 10;        // 10–22 s
        const delay = Math.random() * 10;                // 0–10 s
        const opacity = Math.random() * 0.6 + 0.2;       // 0.2–0.8
        const drift = (Math.random() - 0.5) * 40;        // -20..20 px
        return { id: i, size, left, duration, delay, opacity, drift };
      }),
    [count]
  );

  return (
    <>
      {/* keyframes прямо здесь, чтобы не лезть в CSS */}
      <style>{`
        @keyframes floatDown {
          0%   { transform: translate3d(var(--drift,0), -120vh, 0); }
          100% { transform: translate3d(calc(var(--drift,0) * -1), 120vh, 0); }
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {dots.map((d) => (
          <span
            key={d.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${d.left}%`,
              top: `-10vh`,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              filter: "blur(0.3px)",
              animation: `floatDown ${d.duration}s linear ${d.delay}s infinite`,
              // лёгкий горизонтальный дрейф
              ["--drift"]: `${d.drift}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function Admin() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { token } = await login(username, password);
      localStorage.setItem("token", token);
      location.href = "/admin/table";
    } catch (e) {
      setErr(e?.message || "Ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0e0e0e]">
      {/* Радиа́льный мягкий фон + анимированные точки */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2E8B57_0%,_#0E0E0E_60%)] opacity-25" />
      <Particles count={70} />

      {/* Контент по центру */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-white">Вход в админку</h1>
            <p className="mt-1 text-sm text-white/60">Введите логин и пароль</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-white/80">Логин</label>
              <input
                className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/40 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                value={username}
                onChange={(e) => setU(e.target.value)}
                placeholder="user"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/80">Пароль</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  className="w-full rounded-lg border border-white/10 bg-white/10 px-3 py-2 pr-10 text-white placeholder-white/40 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
                  value={password}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute inset-y-0 right-0 grid w-10 place-items-center text-white/70 hover:text-white transition"
                  aria-label={show ? "Скрыть пароль" : "Показать пароль"}
                  tabIndex={-1}
                >
                  {show ? (
                    // eye-off
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" />
                      <path d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-3.42M9.88 5.09A10.87 10.87 0 0112 5c7 0 10 7 10 7a13.2 13.2 0 01-3.06 4.17M6.06 6.06A13.2 13.2 0 002 12s3 7 10 7a10.87 10.87 0 003.12-.46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    // eye
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {err && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {err}
              </div>
            )}

            <button
              className="w-full rounded-lg bg-emerald-600 py-2 text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/30 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Входим..." : "Войти"}
            </button>
          </form>

          {/* мелкий футер */}
          <div className="mt-4 text-center text-xs text-white/40">
            Защищённая зона • Admin
          </div>
        </div>
      </div>
    </div>
  );
}