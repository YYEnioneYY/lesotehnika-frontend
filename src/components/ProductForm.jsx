import { useState, useEffect } from "react";
import { uploadImages } from "../api";

const TYPE_OPTIONS = [
  { value: "HARVESTER", label: "Харвестер" },
  { value: "FORWARDER", label: "Форвардер" },
  { value: "HARVESTER_HEAD", label: "Голова" },
];

// небольшие хелперы для detail-полей
const num = (v) => (v === "" || v === null || v === undefined ? null : Number(v));
const strOrNull = (v) => (v === "" ? null : v);

export default function ProductForm({ initial, onSubmit, onCancel }) {
  const [type, setType] = useState(initial?.type || "HARVESTER");
  const [title, setTitle] = useState(initial?.title || "");
  const [brand, setBrand] = useState(initial?.brand || "");
  const [model, setModel] = useState(initial?.model || "");
  const [year, setYear] = useState(initial?.year ?? "");
  const [hours, setHours] = useState(initial?.hours ?? "");
  const [price, setPrice] = useState(initial?.price ?? "");
  const [currency, setCurrency] = useState(initial?.currency || "EUR");
  const [status, setStatus] = useState(initial?.status || "DRAFT");
  const [images, setImages] = useState((initial?.images || []).map((i) => i.url));
  const [uploading, setUploading] = useState(false);

  // ини detail из initial
  const [detail, setDetail] = useState(() => {
    if (initial?.harvester) return { ...initial.harvester };
    if (initial?.forwarder) return { ...initial.forwarder };
    if (initial?.head) return { ...initial.head };
    return {};
  });

  // при смене типа сбрасываем detail
  useEffect(() => {
    setDetail({});
  }, [type]);

  const setD = (key, val) => setDetail((prev) => ({ ...prev, [key]: val }));

  function submit(e) {
    e.preventDefault();
    const payload = {
      type,
      title,
      brand,
      model,
      year: year ? Number(year) : null,
      hours: hours ? Number(hours) : null,
      price: price ? Number(price) : null,
      currency,
      status,
      images,
      detail,
    };
    onSubmit(payload);
  }

  async function handleFilesSelected(e) {
    const files = e.target.files;
    if (!files || !files.length) return;
    try {
      setUploading(true);
      const { urls } = await uploadImages(files);
      setImages((prev) => [...prev, ...urls]);
    } catch (err) {
      alert(err.message || "Не удалось загрузить изображения");
    } finally {
      setUploading(false);
      e.target.value = ""; // сброс input
    }
  }

  function removeImage(url) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  // базовые cls
  const panel =
    "rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/10 p-4 md:p-6 text-white";
  const label = "block text-sm mb-1 text-white/80";
  const field =
    "w-full rounded-lg border px-3 py-2 outline-none transition " +
    "bg-[#333333] text-white placeholder-white/50 border-white/15 " +
    "focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/30";
  const select = field + " pr-10 appearance-none";
  const groupTitle = "text-lg font-semibold mb-3 text-white";

  return (
    <form onSubmit={submit} className={`${panel} space-y-8`}>
      {/* Базовые поля продукта */}
      <section className={`${panel}`}>
        <h2 className="text-xl font-semibold mb-4">Основные данные</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Тип" labelCls={label}>
            <div className="relative">
              <select className={select} value={type} onChange={(e) => setType(e.target.value)}>
                {TYPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <Caret />
            </div>
          </Field>

          <Field label="Статус" labelCls={label}>
            <div className="relative">
              <select className={select} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>DRAFT</option>
                <option>PUBLISHED</option>
                <option>ARCHIVED</option>
              </select>
              <Caret />
            </div>
          </Field>

          <Field label="Цена" labelCls={label}>
            <input className={field} value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
          </Field>

          <Field label="Название" labelCls={label}>
            <input className={field} value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field label="Бренд" labelCls={label}>
            <input className={field} value={brand} onChange={(e) => setBrand(e.target.value)} />
          </Field>

          <Field label="Модель" labelCls={label}>
            <input className={field} value={model} onChange={(e) => setModel(e.target.value)} />
          </Field>

          <Field label="Год" labelCls={label}>
            <input className={field} value={year} onChange={(e) => setYear(e.target.value)} inputMode="numeric" />
          </Field>

          <Field label="Часы" labelCls={label}>
            <input className={field} value={hours} onChange={(e) => setHours(e.target.value)} inputMode="numeric" />
          </Field>

          <Field label="Валюта" labelCls={label}>
            <input className={field} value={currency} onChange={(e) => setCurrency(e.target.value)} />
          </Field>
        </div>
        <Accent />
      </section>

      {/* Изображения */}
      <section className={`${panel}`}>
        <h2 className="text-xl font-semibold mb-4">Изображения</h2>
        <label className={label}>Добавить файлы</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          multiple
          onChange={handleFilesSelected}
          className="
            block w-full text-sm
            file:mr-4 file:py-2 file:px-3
            file:rounded-lg file:border file:border-[#FFD700] file:text-[#FFD700]
            file:bg-transparent hover:file:bg-[#FFD700]/10
            file:transition
          "
        />
        {uploading && <div className="text-sm text-white/70 mt-2">Загрузка…</div>}

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {images.map((url) => (
              <div
                key={url}
                className="
                  relative group overflow-hidden rounded-xl
                  bg-[#333333] ring-1 ring-white/10
                "
              >
                <img src={url} alt="" className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="
                    absolute top-2 right-2 text-xs
                    px-2 py-1 rounded-md border
                    bg-white/90 text-black border-white
                    opacity-0 group-hover:opacity-100 transition
                  "
                >
                  Удалить
                </button>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        )}
        <Accent />
      </section>

      {/* Типо-специфичные ДЕТАЛИ */}
      {type === "HARVESTER" && (
        <DetailGroup title="Харвестер — детали" groupTitle={groupTitle} panel={panel}>
          <Grid>
            <NumberInput label="Мощность двигателя, кВт" value={detail.enginePowerKw} onChange={(v) => setD("enginePowerKw", num(v))} field={field} labelCls={label} />
            <TextInput label="Экостандарт (emissionStage)" value={detail.emissionStage} onChange={(v) => setD("emissionStage", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Гидронасос, суммарно cc" value={detail.hydraulicPumpCcTotal} onChange={(v) => setD("hydraulicPumpCcTotal", num(v))} field={field} labelCls={label} />
            <NumberInput label="Макс. давление, бар" value={detail.maxPressureBar} onChange={(v) => setD("maxPressureBar", num(v))} field={field} labelCls={label} />

            <TextInput label="Вылет стрелы мин, м (десятичное)" value={detail.boomReachMinM} onChange={(v) => setD("boomReachMinM", strOrNull(v))} field={field} labelCls={label} />
            <TextInput label="Вылет стрелы макс, м (десятичное)" value={detail.boomReachMaxM} onChange={(v) => setD("boomReachMaxM", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Подъём на макс. вылете, кг" value={detail.liftAtMaxReachKg} onChange={(v) => setD("liftAtMaxReachKg", num(v))} field={field} labelCls={label} />

            <NumberInput label="Кол-во ведущих колёс" value={detail.driveWheels} onChange={(v) => setD("driveWheels", num(v))} field={field} labelCls={label} />
            <NumberInput label="Тяговое усилие, кН" value={detail.tractiveForceKn} onChange={(v) => setD("tractiveForceKn", num(v))} field={field} labelCls={label} />
            <TextInput label="Скорость хода, км/ч (десятичное)" value={detail.travelSpeedKph} onChange={(v) => setD("travelSpeedKph", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Клиренс, мм" value={detail.groundClearanceMm} onChange={(v) => setD("groundClearanceMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Внутр. радиус разворота, мм" value={detail.innerTurningRadiusMm} onChange={(v) => setD("innerTurningRadiusMm", num(v))} field={field} labelCls={label} />

            <NumberInput label="Длина трансп., мм" value={detail.transportLengthMm} onChange={(v) => setD("transportLengthMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Ширина трансп., мм" value={detail.transportWidthMm} onChange={(v) => setD("transportWidthMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Высота трансп., мм" value={detail.transportHeightMm} onChange={(v) => setD("transportHeightMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Эксплуатационная масса, кг" value={detail.operatingWeightKg} onChange={(v) => setD("operatingWeightKg", num(v))} field={field} labelCls={label} />

            <TextInput label="Совместимые головы (список/JSON)" value={detail.compatibleHeads} onChange={(v) => setD("compatibleHeads", strOrNull(v))} field={field} labelCls={label} />
            <TextInput label="Шины/траки" value={detail.tires} onChange={(v) => setD("tires", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Уклон, %" value={detail.slopeCapabilityPct} onChange={(v) => setD("slopeCapabilityPct", num(v))} field={field} labelCls={label} />
            <TextInput label="Система управления" value={detail.controlSystem} onChange={(v) => setD("controlSystem", strOrNull(v))} field={field} labelCls={label} />
          </Grid>
          <Accent />
        </DetailGroup>
      )}

      {type === "FORWARDER" && (
        <DetailGroup title="Форвардер — детали" groupTitle={groupTitle} panel={panel}>
          <Grid>
            <NumberInput label="Грузоподъёмность, кг" value={detail.payloadKg} onChange={(v) => setD("payloadKg", num(v))} field={field} labelCls={label} />
            <NumberInput label="Длина бункера, мм" value={detail.bunkLengthMm} onChange={(v) => setD("bunkLengthMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Ширина бункера, мм" value={detail.bunkWidthMm} onChange={(v) => setD("bunkWidthMm", num(v))} field={field} labelCls={label} />
            <TextInput label="Площадь бункера, м² (десятичное)" value={detail.bunkAreaM2} onChange={(v) => setD("bunkAreaM2", strOrNull(v))} field={field} labelCls={label} />

            <TextInput label="Вылет крана, м (десятичное)" value={detail.craneReachM} onChange={(v) => setD("craneReachM", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Подъём на макс. вылете, кг" value={detail.liftAtMaxReachKg} onChange={(v) => setD("liftAtMaxReachKg", num(v))} field={field} labelCls={label} />
            <TextInput label="Момент поворота, кН·м (десятичное)" value={detail.swingTorqueKnm} onChange={(v) => setD("swingTorqueKnm", strOrNull(v))} field={field} labelCls={label} />

            <NumberInput label="Тяговое усилие, кН" value={detail.tractiveForceKn} onChange={(v) => setD("tractiveForceKn", num(v))} field={field} labelCls={label} />
            <TextInput label="Скорость низк., км/ч (десятичное)" value={detail.speedLowKph} onChange={(v) => setD("speedLowKph", strOrNull(v))} field={field} labelCls={label} />
            <TextInput label="Скорость высок., км/ч (десятичное)" value={detail.speedHighKph} onChange={(v) => setD("speedHighKph", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Клиренс, мм" value={detail.groundClearanceMm} onChange={(v) => setD("groundClearanceMm", num(v))} field={field} labelCls={label} />

            <NumberInput label="Мощность двигателя, кВт" value={detail.enginePowerKw} onChange={(v) => setD("enginePowerKw", num(v))} field={field} labelCls={label} />
            <NumberInput label="Крутящий момент, Н·м" value={detail.torqueNm} onChange={(v) => setD("torqueNm", num(v))} field={field} labelCls={label} />
            <TextInput label="Тип гидравлики" value={detail.hydraulicType} onChange={(v) => setD("hydraulicType", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Давление гидравлики, бар" value={detail.hydraulicPressureBar} onChange={(v) => setD("hydraulicPressureBar", num(v))} field={field} labelCls={label} />

            <NumberInput label="Эксплуатационная масса, кг" value={detail.operatingWeightKg} onChange={(v) => setD("operatingWeightKg", num(v))} field={field} labelCls={label} />
            <TextInput label="Колёсная формула/шины" value={detail.wheelsConfig} onChange={(v) => setD("wheelsConfig", strOrNull(v))} field={field} labelCls={label} />
          </Grid>
          <Accent />
        </DetailGroup>
      )}

      {type === "HARVESTER_HEAD" && (
        <DetailGroup title="Харвестерная голова — детали" groupTitle={groupTitle} panel={panel}>
          <Grid>
            <NumberInput label="Масса, кг" value={detail.weightKg} onChange={(v) => setD("weightKg", num(v))} field={field} labelCls={label} />
            <NumberInput label="Макс диаметр реза, мм" value={detail.maxCutDiameterMm} onChange={(v) => setD("maxCutDiameterMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Длина шины, мм" value={detail.sawBarLengthMm} onChange={(v) => setD("sawBarLengthMm", num(v))} field={field} labelCls={label} />
            <TextInput label="Тип цепи" value={detail.chainType} onChange={(v) => setD("chainType", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Объём мотора пилы, cc" value={detail.sawMotorCc} onChange={(v) => setD("sawMotorCc", num(v))} field={field} labelCls={label} />
            <TextInput label="Бак масла, л (десятичное)" value={detail.oilTankL} onChange={(v) => setD("oilTankL", strOrNull(v))} field={field} labelCls={label} />

            <TextInput label="Скорость подачи, м/с (десятичное)" value={detail.feedSpeedMs} onChange={(v) => setD("feedSpeedMs", strOrNull(v))} field={field} labelCls={label} />
            <TextInput label="Усилие подачи, кН (десятичное)" value={detail.feedForceKn} onChange={(v) => setD("feedForceKn", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Кол-во приводных роликов" value={detail.driveRollersCount} onChange={(v) => setD("driveRollersCount", num(v))} field={field} labelCls={label} />
            <NumberInput label="Раскрытие роликов мин, мм" value={detail.rollerOpenMinMm} onChange={(v) => setD("rollerOpenMinMm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Раскрытие роликов макс, мм" value={detail.rollerOpenMaxMm} onChange={(v) => setD("rollerOpenMaxMm", num(v))} field={field} labelCls={label} />

            <TextInput label="Конфигурация ножей" value={detail.knivesConfig} onChange={(v) => setD("knivesConfig", strOrNull(v))} field={field} labelCls={label} />
            <NumberInput label="Макс проём делимб., мм" value={detail.delimbOpenMaxMm} onChange={(v) => setD("delimbOpenMaxMm", num(v))} field={field} labelCls={label} />
            <TextInput label="Измерительная система" value={detail.measuringSystem} onChange={(v) => setD("measuringSystem", strOrNull(v))} field={field} labelCls={label} />

            <NumberInput label="Требуемый расход, л/мин" value={detail.requiredFlowLpm} onChange={(v) => setD("requiredFlowLpm", num(v))} field={field} labelCls={label} />
            <NumberInput label="Макс давление, бар" value={detail.maxPressureBar} onChange={(v) => setD("maxPressureBar", num(v))} field={field} labelCls={label} />

            <NumberInput label="Мин масса носителя, т" value={detail.carrierRangeTonsMin} onChange={(v) => setD("carrierRangeTonsMin", num(v))} field={field} labelCls={label} />
            <NumberInput label="Макс масса носителя, т" value={detail.carrierRangeTonsMax} onChange={(v) => setD("carrierRangeTonsMax", num(v))} field={field} labelCls={label} />
          </Grid>
          <Accent />
        </DetailGroup>
      )}

      {/* Кнопки */}
      <div className="flex flex-wrap gap-3">
        <button
          className="
            inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition
            border border-[#FFD700] text-[#FFD700]
            hover:bg-[#FFD700]/10 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40
          "
        >
          Сохранить
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="
            inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition
            border border-white/15 text-white
            hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-white/30
          "
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

/* ---------- Утилиты UI ---------- */
function Field({ label, children, labelCls }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function DetailGroup({ title, children, groupTitle, panel }) {
  return (
    <section className={`${panel} space-y-4`}>
      <h2 className={groupTitle}>{title}</h2>
      {children}
      <Accent />
    </section>
  );
}

function Grid({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>;
}

function TextInput({ label, value, onChange, placeholder, field, labelCls }) {
  return (
    <Field label={label} labelCls={labelCls}>
      <input
        className={field}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  );
}

function NumberInput({ label, value, onChange, field, labelCls }) {
  return (
    <Field label={label} labelCls={labelCls}>
      <input
        className={field}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
      />
    </Field>
  );
}

function Caret() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
      </svg>
    </span>
  );
}

function Accent() {
  return (
    <div className="mt-4 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
  );
}