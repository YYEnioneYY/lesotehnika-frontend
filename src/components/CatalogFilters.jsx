const TYPES = [
  { value: "", label: "Все типы" },
  { value: "HARVESTER", label: "Харвестеры" },
  { value: "FORWARDER", label: "Форвардеры" },
  { value: "HARVESTER_HEAD", label: "Головы" },
];

export default function CatalogFilters({
  type, setType,
  brand, setBrand, brandOptions = [],
  year, setYear, yearOptions = [],
  q, setQ,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  onReset
}) {
  const field =
    "w-full rounded-lg border border-white/10 bg-white/10 text-white " +
    "px-3 py-2 outline-none placeholder-white/40 " +
    "focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 transition";

  const selectBase =
    "appearance-none w-full rounded-lg border px-3 py-2 pr-10 outline-none " +
    "bg-[#333333] text-white/80 border-white/10 " +
    "focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition";

  const labelCls = "block text-sm mb-1 text-white/80";

  const card =
    "rounded-2xl bg-white/[0.05] backdrop-blur-md ring-1 ring-white/10 p-4 md:p-5";

  const resetBtn =
    "w-full rounded-lg border border-[#FFD700] text-white/90 px-4 py-2 " +
    "hover:bg-white/[0.08] transition focus:outline-none focus:ring-2 focus:ring-white/20";

  return (
    <div className={`${card}`}>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4 items-end">
        {/* Тип */}
        <div className="relative">
          <label className={labelCls}>Тип</label>
          <select
            className={selectBase}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {/* стрелка */}
          <span className="pointer-events-none absolute right-3 bottom-3.5 text-white/60">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </div>

        {/* Производитель */}
        <div className="relative">
          <label className={labelCls}>Производитель</label>
          <select
            className={selectBase}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Производители</option>
            {brandOptions.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 bottom-3.5 text-white/60">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </div>

        {/* Год */}
        <div className="relative">
          <label className={labelCls}>Год</label>
          <select
            className={selectBase}
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Все годы</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 bottom-3.5 text-white/60">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
        </div>

        {/* Цена от */}
        <div>
          <label className={labelCls}>Цена от</label>
          <input
            className={field}
            inputMode="numeric"
            placeholder="от…"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Цена до */}
        <div>
          <label className={labelCls}>Цена до</label>
          <input
            className={field}
            inputMode="numeric"
            placeholder="до…"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Сброс */}
        <div className="md:col-span-1">
          <button type="button" onClick={onReset} className={resetBtn}>
            Сбросить
          </button>
        </div>

        {/* Поиск */}
        <div className="md:col-span-6 relative mt-2">
          <label className={labelCls}>Поиск</label>
          <span className="pointer-events-none absolute left-3 top-[38px] text-white/60">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <input
            className={`${field} pl-10`}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Название, модель..."
          />
        </div>
      </div>
    </div>
  );
}