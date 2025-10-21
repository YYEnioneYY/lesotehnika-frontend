import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Product() {
  const { idOrSlug } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try { setLoading(true); setP(await getProduct(idOrSlug)); }
      catch (e) { setErr(e.message || "Ошибка загрузки"); }
      finally { setLoading(false); }
    })();
  }, [idOrSlug]);

  if (loading) return <div className="py-16 text-white/80">Загрузка…</div>;
  if (err) return <div className="py-16 text-red-400">{err}</div>;
  if (!p) return <div className="py-16 text-white/80">Не найдено</div>;

  const price = p.price
    ? new Intl.NumberFormat("ru-RU", { style: "currency", currency: p.currency || "EUR" }).format(Number(p.price))
    : "По запросу";

  return (
    <>
      <NavBar />
      <div className="py-24 bg-[linear-gradient(to_bottom,_#0e0e0e,_#333333)] text-white">
        <div className="space-y-10 mx-4 sm:mx-6 md:mx-8 lg:mx-24">

          {/* 1) Основное */}
          <section
            className="
              relative rounded-2xl p-5 md:p-6
              bg-white/10 backdrop-blur-md ring-1 ring-white/10
            "
          >
            <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <div className="text-white/70 mt-1">
              {[p.brand, p.model, p.year].filter(Boolean).join(" · ")}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="text-2xl text-[#FFD700] font-semibold">{price}</div>
              {p.location && <div className="text-sm text-white/70">📍 {p.location}</div>}
            </div>

            {p.description && (
              <p className="mt-5 whitespace-pre-line text-white/90 leading-relaxed">
                {p.description}
              </p>
            )}
          </section>

          {/* 2) Галерея */}
          <Gallery images={p.images} title={p.title} price={price} />

          {/* 3) Характеристики */}
          <Specs product={p} />
        </div>
      </div>
      <Footer />
    </>
  );
}

function Gallery({ images = [], title, price }) {
  if (!images.length) {
    return (
      <section
        className="
          aspect-video rounded-2xl
          bg-white/10 backdrop-blur-md ring-1 ring-white/10
        "
      />
    );
  }

  const [cover, ...rest] = images;
  return (
    <section className="space-y-3">
      <div
        className="
          group relative aspect-video rounded-2xl overflow-hidden
          bg-[#333333] ring-1 ring-white/10
        "
      >
        <img
          src={cover.url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* мягкий блик */}
        <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 via-transparent to-[#FFD700]/10" />
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {rest.map((img) => (
            <div
              key={img.id}
              className="
                relative aspect-[16/10] rounded-xl overflow-hidden
                bg-[#333333] ring-1 ring-white/10 group/thumb
              "
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                loading="lazy"
              />
              <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-white/5" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Specs({ product: p }) {
  const rows = [];

  // Общие
  add(rows, "Тип", humanType(p.type));
  add(rows, "Состояние", humanCond(p.condition));
  if (p.hours) add(rows, "Моточасы", fmtInt(p.hours));
  if (p.year) add(rows, "Год", p.year);

  // Детали по типу
  if (p.type === "HARVESTER" && p.harvester) {
    const d = p.harvester;
    add(rows, "Мощность, кВт", d.enginePowerKw);
    add(rows, "Эко-стандарт", d.emissionStage);
    add(rows, "Насос, cc (суммарно)", d.hydraulicPumpCcTotal);
    add(rows, "Макс. давление, бар", d.maxPressureBar);
    add(rows, "Вылет стрелы, м", rangeStr(d.boomReachMinM, d.boomReachMaxM));
    add(rows, "Подъём на макс. вылете, кг", d.liftAtMaxReachKg);
    add(rows, "Ведущие колёса", d.driveWheels);
    add(rows, "Тяговое усилие, кН", d.tractiveForceKn);
    add(rows, "Скорость, км/ч", d.travelSpeedKph);
    add(rows, "Клиренс, мм", d.groundClearanceMm);
    add(rows, "Внутр. радиус, мм", d.innerTurningRadiusMm);
    add(rows, "Габариты (Д×Ш×В), мм", dims(d.transportLengthMm, d.transportWidthMm, d.transportHeightMm));
    add(rows, "Масса, кг", d.operatingWeightKg);
    add(rows, "Совместимые головы", d.compatibleHeads);
    add(rows, "Шины/траки", d.tires);
    add(rows, "Работа на уклоне, %", d.slopeCapabilityPct);
    add(rows, "Система управления", d.controlSystem);
  }

  if (p.type === "FORWARDER" && p.forwarder) {
    const d = p.forwarder;
    add(rows, "Грузоподъёмность, кг", d.payloadKg);
    add(rows, "Бункер (Д×Ш), мм", dims(d.bunkLengthMm, d.bunkWidthMm));
    add(rows, "Площадь бункера, м²", d.bunkAreaM2);
    add(rows, "Вылет крана, м", d.craneReachM);
    add(rows, "Подъём на макс. вылете, кг", d.liftAtMaxReachKg);
    add(rows, "Момент поворота, кН·м", d.swingTorqueKnm);
    add(rows, "Тяговое усилие, кН", d.tractiveForceKn);
    add(rows, "Скорость (низ/выс), км/ч", rangeStr(d.speedLowKph, d.speedHighKph));
    add(rows, "Клиренс, мм", d.groundClearanceMm);
    add(rows, "Мощность двигателя, кВт", d.enginePowerKw);
    add(rows, "Крутящий момент, Н·м", d.torqueNm);
    add(rows, "Гидравлика", d.hydraulicType);
    add(rows, "Давление гидравлики, бар", d.hydraulicPressureBar);
    add(rows, "Масса, кг", d.operatingWeightKg);
    add(rows, "Колёсная конфигурация", d.wheelsConfig);
  }

  if (p.type === "HARVESTER_HEAD" && p.head) {
    const d = p.head;
    add(rows, "Масса, кг", d.weightKg);
    add(rows, "Макс диаметр реза, мм", d.maxCutDiameterMm);
    add(rows, "Длина шины, мм", d.sawBarLengthMm);
    add(rows, "Тип цепи", d.chainType);
    add(rows, "Мотор пилы, cc", d.sawMotorCc);
    add(rows, "Бак масла, л", d.oilTankL);
    add(rows, "Скорость подачи, м/с", d.feedSpeedMs);
    add(rows, "Усилие подачи, кН", d.feedForceKn);
    add(rows, "Приводные ролики, шт", d.driveRollersCount);
    add(rows, "Раскрытие роликов (мин/макс), мм", rangeStr(d.rollerOpenMinMm, d.rollerOpenMaxMm));
    add(rows, "Конфиг. ножей", d.knivesConfig);
    add(rows, "Макс проём делимб., мм", d.delimbOpenMaxMm);
    add(rows, "Измерительная система", d.measuringSystem);
    add(rows, "Требуемый расход, л/мин", d.requiredFlowLpm);
    add(rows, "Макс давление, бар", d.maxPressureBar);
    add(rows, "Масса носителя, т (мин/макс)", rangeStr(d.carrierRangeTonsMin, d.carrierRangeTonsMax));
  }

  if (!rows.length) return null;

  return (
    <section className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md ring-1 ring-white/10">
      <div className="px-4 py-3 border-b border-white/10 font-semibold">
        Характеристики
      </div>

      {/* стеклянная таблица */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, v], i) => (
              <tr
                key={k}
                className={`
                  border-t border-white/10
                  ${i % 2 === 1 ? "bg-white/5" : ""}
                  hover:bg-white/[0.08] transition
                `}
              >
                <td className="px-4 py-2 text-white/70 w-1/3">{k}</td>
                <td className="px-4 py-2 text-white">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* нижний акцент */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
    </section>
  );
}

/* helpers */
function add(arr, k, v) { if (v !== null && v !== undefined && v !== "" ) arr.push([k, String(v)]); }
function fmtInt(v){ return new Intl.NumberFormat("ru-RU").format(Number(v)); }
function rangeStr(a,b){ if(a!=null && b!=null) return `${a} / ${b}`; if(a!=null) return `${a}`; if(b!=null) return `${b}`; return ""; }
function dims(L,W,H){ const parts = [L,W,H].filter(x=>x!=null).map(x=>x); return parts.length? parts.join(" × ") : ""; }
function humanType(t){ return t==="HARVESTER"?"Харвестер":t==="FORWARDER"?"Форвардер":t==="HARVESTER_HEAD"?"Харв. голова":t; }
function humanCond(c){ return c==="NEW"?"Новый":c==="USED"?"Б/у":c==="REFURBISHED"?"Ремонтированный":""; }