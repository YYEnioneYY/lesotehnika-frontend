import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listProducts, getFiltersMeta } from "../api";
import ProductCard from "../components/ProductCard";
import CatalogFilters from "../components/CatalogFilters";

export default function Tech() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 12;

  // фильтры
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [q, setQ] = useState("");

  // Опции
  const [brandOptions, setBrandOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);

  // кол-во страниц
  const pages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total]);

  /* ==== 1) Инициализация из URL один раз ==== */
  useEffect(() => {
    const t = searchParams.get("type");
    const b = searchParams.get("brand");
    const y = searchParams.get("year");
    const sMin = searchParams.get("min");
    const sMax = searchParams.get("max");
    const sQ = searchParams.get("q");
    const p = Number(searchParams.get("page") || "1");

    if (t === "HARVESTER" || t === "FORWARDER" || t === "HARVESTER_HEAD") setType(t);
    if (b) setBrand(b);
    if (y && /^\d{4}$/.test(y)) setYear(y);
    if (sMin) setMinPrice(sMin);
    if (sMax) setMaxPrice(sMax);
    if (sQ) setQ(sQ);
    if (Number.isFinite(p) && p > 0) setPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // только на первом рендере

  /* ==== 2) Подгрузка опций при старте и смене type ==== */
  useEffect(() => {
    (async () => {
      try {
        const meta = await getFiltersMeta(type || undefined);
        setBrandOptions(meta.brands || []);
        // список лет (по убыванию)
        const ys = [];
        const minY = meta.yearRange?.min ?? null;
        const maxY = meta.yearRange?.max ?? null;
        if (minY && maxY) {
          for (let y = maxY; y >= minY; y--) ys.push(y);
        }
        setYearOptions(ys);
        // если текущие brand/year выпали из опций — сбросим
        if (brand && !meta.brands?.includes(brand)) setBrand("");
        if (year && !ys.includes(Number(year))) setYear("");
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить параметры фильтров");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  /* ==== 3) Загрузка каталога ==== */
  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listProducts({
        page,
        pageSize,
        type,
        q,
        minPrice,
        maxPrice,
        brand,
        year,
      });
      setItems(data.items || []);
      setTotal(Number(data.total || 0));
    } catch (e) {
      console.error(e);
      setError("Не удалось загрузить каталог");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  // при изменении фильтров: на 1-ю страницу
  useEffect(() => {
    setPage(1);
  }, [type, brand, year, minPrice, maxPrice, q]);

  // загрузка при изменении page или фильтров
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, type, brand, year, minPrice, maxPrice, q]);

  /* ==== 4) Синхронизация состояния -> URL ==== */
  useEffect(() => {
    const params = new URLSearchParams();
    if (type) params.set("type", type);
    if (brand) params.set("brand", brand);
    if (year) params.set("year", year);
    if (q) params.set("q", q);
    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    if (page > 1) params.set("page", String(page));
    setSearchParams(params, { replace: true });
  }, [type, brand, year, q, minPrice, maxPrice, page, setSearchParams]);

  function resetFilters() {
    setType("");
    setBrand("");
    setYear("");
    setMinPrice("");
    setMaxPrice("");
    setQ("");
    setPage(1);
    setSearchParams({}, { replace: true });
  }

  return (
    <>
      <NavBar />
      <div className="pt-24 pb-16 bg-[#0e0e0e]">
        <h1 className="text-[#e5e5e5] font-extrabold text-3xl text-center uppercase lg:text-4xl">
          Техника
        </h1>
        <p className="text-[#BFBFBF] text-md text-center lg:text-lg">
          Современные машины для профессиональной заготовки леса
        </p>
      </div>

      <div className="bg-[linear-gradient(to_bottom,_#0e0e0e_0%,_#333333_100%)]">
        <div className="space-y-6 pb-16 mx-4 sm:mx-6 md:mx-8 lg:mx-24">
          <CatalogFilters
            type={type} setType={setType}
            brand={brand} setBrand={setBrand} brandOptions={brandOptions}
            year={year} setYear={setYear} yearOptions={yearOptions}
            q={q} setQ={setQ}
            minPrice={minPrice} setMinPrice={setMinPrice}
            maxPrice={maxPrice} setMaxPrice={setMaxPrice}
            onReset={resetFilters}
          />

          {error && <div className="text-red-400">{error}</div>}
          {loading && <div className="text-gray-300">Загрузка…</div>}

          {!loading && items.length === 0 && !error && (
            <div className="text-gray-300">
              Ничего не найдено. Попробуйте изменить фильтры.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {pages > 1 && (
            <div className="flex justify-center gap-2">
              <button
                className="px-3 py-1 rounded-xl border border-white/15 text-white hover:bg-white/[0.08] transition disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Назад
              </button>
              <div className="px-3 py-1 text-gray-200">
                Стр. {page} / {pages}
              </div>
              <button
                className="px-3 py-1 rounded-xl border border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 transition disabled:opacity-40"
                disabled={page >= pages}
                onClick={() => setPage((p) => p + 1)}
              >
                Вперёд
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}