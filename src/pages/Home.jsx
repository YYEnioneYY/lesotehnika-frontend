import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import heroImg from "../assets/images/heroImg2.png";
import harvImg from "../assets/images/harvImg2.png";
import forwarderImg from "../assets/images/forwarderImg2.png";
import harvHeadImg from "../assets/images/harvHeadImg.png";

import gear from "../assets/icons/gear.png";
import arm from "../assets/icons/arm.png";
import repair from "../assets/icons/repair.png";
import earth from "../assets/icons/earth.png";

import forwarder25years from "../assets/images/forwarder25years.jpg";
import forwBack from "../assets/images/forwBack.jpg";
import harvHead1 from "../assets/images/harvHead1.jpg";
import harvHead2 from "../assets/images/harvHead2.jpg";

import Contacts from "../components/Contacts";
import Footer from "../components/Footer";

import { motion } from "framer-motion";

/* ---------- твои анимации без изменений ---------- */
const imageLeft = {
  hidden: { x: -80, opacity: 0 },
  show:   { x: 0,  opacity: 1, transition: { duration: 3.0, ease: [0.22,1,0.36,1] } }
};

const textParent = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 2.0, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
  }
};
const textChild = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 2.0 } }
};

const cardsParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 }
  }
};

const cardItem = {
  hidden: { y: 32, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { duration: 2.8, ease: [0.22,1,0.36,1] } }
};

const sectionParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.18 }
  }
};

const fadeUp = {
  hidden: { y: 28, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { duration: 2.6, ease: [0.22,1,0.36,1] } }
};

const slideLeftImg = {
  hidden: { x: -40, opacity: 0, scale: 0.98 },
  show:   { x: 0,   opacity: 1, scale: 1, transition: { duration: 2.7, ease: [0.22,1,0.36,1] } }
};

const slideRightText = {
  hidden: { x: 40, opacity: 0 },
  show:   { x: 0,  opacity: 1, transition: { duration: 2.6, ease: [0.22,1,0.36,1] } }
};

/* ---------- стиль кнопок (как на admin) ---------- */
const btnBase =
  "inline-flex items-center justify-center uppercase text-center select-none transition " +
  "focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-[0.99]";
const btnSize = "text-xs sm:text-sm md:text-base py-2 px-3 sm:py-3 sm:px-5";

const btnGold =
  "rounded-[16px] sm:rounded-[20px] bg-[#D4AF37] text-white " +
  "hover:bg-[#c6a034] hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)]";
const btnOutlineGreen =
  "rounded-[16px] sm:rounded-[20px] border border-[#17E673] text-white " +
  "hover:bg-[#17E673] hover:text-black hover:shadow-[0_10px_30px_rgba(23,230,115,0.2)]";

/* для блоков ниже — те же базовые + их цвета */
const btnSolidGreen =
  "rounded-[16px] sm:rounded-[20px] bg-[#2E8B57] text-white hover:bg-[#287b4e] hover:shadow-[0_10px_30px_rgba(46,139,87,0.25)]";
const btnSolidPurple =
  "rounded-[16px] sm:rounded-[20px] bg-[#46046E] text-white hover:bg-[#3e045f] hover:shadow-[0_10px_30px_rgba(70,4,110,0.28)]";
const btnSolidYellow =
  "rounded-[16px] sm:rounded-[20px] bg-[#FFD700] text-black hover:bg-[#e6c200] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)]";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <NavBar />

      {/* HeroSection с зелёным свечением */}
      <div className="relative overflow-hidden min-h-screen pt-16 bg-[linear-gradient(to_bottom,_#0e0e0e_0%,_#333333_40%,_#333333_60%,_#0e0e0e_100%)]">
        {/* зелёное свечение сверху — только это добавлено */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_#17E673_0%,_transparent_45%)]" />

        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-2">
          {/* Левая колонка — картинка: сверху вниз */}
          <motion.div
            className="min-w-0 inset-0 z-1"
            initial={{ y: -75, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src={heroImg}
              alt="Картинка с форвардером"
              className="w-full h-auto max-w-full object-contain"
              initial={{ scale: 0.78 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3.0, ease: "easeOut" }}
              draggable={false}
            />
          </motion.div>

          {/* Правая колонка — текст: слева направо со стэггером */}
          <motion.div
            className="min-w-0 inset-0 z-1 rounded-xl content-center py-6 space-y-6 lg:space-y-8"
            variants={textParent}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              className="text-[#e5e5e5] font-extrabold text-2xl text-center uppercase lg:text-[44px]"
              variants={textChild}
            >
              Технологии, что приручают лес
            </motion.h1>

            <motion.p
              className="text-[#BFBFBF] text-xs text-center lg:text-lg"
              variants={textChild}
            >
              Продажа харвестеров, форвардеров и харвестерных голов ведущих мировых производителей.
              Точность, мощь и эффективность в каждой машине.
            </motion.p>

            <motion.div
              className="flex flex-col lg:flex-row justify-center items-center gap-3 sm:gap-6"
              variants={textChild}
            >
              <Link
                to="/tech"
                className={`${btnBase} ${btnGold} ${btnSize} w-1/2 sm:w-auto`}
              >
                Каталог техники
              </Link>
              <Link
                to="/contacts"
                className={`${btnBase} ${btnOutlineGreen} ${btnSize} w-1/2 sm:w-auto`}
              >
                Связаться с нами
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* HarvBlock */}
      <div className="min-h-screen pt-32 bg-[#0e0e0e]">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24 grid grid-cols-1 md:grid-cols-[55%_45%] gap-2">
          {/* Левая колонка — КАРТИНКА (въезд слева) */}
          <motion.div
            className="min-w-0 bg-[radial-gradient(circle_at_center,_#2E8B57_0%,_#0E0E0E_55%)] rounded-xl overflow-hidden"
            variants={imageLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <img
              src={harvImg}
              alt="Харвестер"
              className="w-full h-auto max-w-full object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>

          {/* Правая колонка — ТЕКСТ */}
          <motion.div
            className="min-w-0 rounded-xl content-center px-4 py-6 space-y-6 lg:space-y-8 text-center"
            variants={textParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h1 className="text-[#e5e5e5] font-extrabold text-2xl uppercase lg:text-5xl" variants={textChild}>
              Харвестеры
            </motion.h1>
            <motion.p className="text-[#BFBFBF] text-xs lg:text-lg" variants={textChild}>
              Высокотехнологичные машины для заготовки леса. Точная резка, надёжность, эффективность.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6" variants={textChild}>
              <Link
                to="/tech"
                className={`${btnBase} ${btnSize} ${btnSolidGreen} w-1/2 sm:w-auto`}
              >
                Найти сейчас
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ForwarderBlock */}
      <div className="min-h-screen content-center bg-[#0e0e0e]">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24 grid grid-cols-1 md:grid-cols-[55%_45%] gap-2">
          {/* КАРТИНКА слева */}
          <motion.div
            className="min-w-0 content-center bg-[radial-gradient(circle_at_center,_#46046E_0%,_#0E0E0E_50%)] rounded-xl overflow-hidden"
            variants={imageLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <img
              src={forwarderImg}
              alt="Форвардер"
              className="w-full h-auto max-w-full object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>

          {/* ТЕКСТ справа */}
          <motion.div
            className="min-w-0 rounded-xl content-center px-4 py-6 space-y-6 lg:space-y-8 text-center"
            variants={textParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h1 className="text-[#e5e5e5] font-extrabold text-2xl uppercase lg:text-5xl" variants={textChild}>
              Форвардеры
            </motion.h1>
            <motion.p className="text-[#BFBFBF] text-xs lg:text-lg" variants={textChild}>
              Надёжные машины для транспортировки древесины. Сила и устойчивость на любом рельефе.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6" variants={textChild}>
              <Link
                to="/tech"
                className={`${btnBase} ${btnSize} ${btnSolidPurple} w-1/2 sm:w-auto`}
              >
                Найти сейчас
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* HarvHeadBlock */}
      <div className="h-screen content-center bg-[#0e0e0e]">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24 grid grid-cols-1 md:grid-cols-[55%_45%] gap-2">
          {/* КАРТИНКА слева */}
          <motion.div
            className="min-w-0 content-center bg-[radial-gradient(circle_at_center,_#FFD700_0%,_#0E0E0E_50%)] rounded-xl overflow-hidden"
            variants={imageLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <img
              src={harvHeadImg}
              alt="Харвестерная голова"
              className="w-full h-auto max-w-full object-contain"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </motion.div>

          {/* ТЕКСТ справа */}
          <motion.div
            className="min-w-0 rounded-xl content-center px-4 py-6 space-y-6 lg:space-y-8 text-center"
            variants={textParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.h1 className="text-[#e5e5e5] font-extrabold text-2xl uppercase lg:text-5xl" variants={textChild}>
              Харвестерные головы
            </motion.h1>
            <motion.p className="text-[#BFBFBF] text-xs lg:text-lg" variants={textChild}>
              Инновационные головные модули для точной обработки древесины. Максимальная производительность и долговечность.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6" variants={textChild}>
              <Link
                to="/tech"
                className={`${btnBase} ${btnSize} ${btnSolidYellow} w-1/2 sm:w-auto`}
              >
                Найти сейчас
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Why us? — только стиль карточек обновлён */}
      <div className="py-16 min-h-screen bg-[#0e0e0e] content-center">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24">
          <h1 className="text-[#e5e5e5] font-extrabold text-2xl text-center uppercase lg:text-5xl">
            Почему выбирают нас
          </h1>

          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={cardsParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* 1 */}
            <motion.div
              variants={cardItem}
              className="rounded-3xl p-6 space-y-6 text-white bg-white/[0.04] backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <img src={gear} alt="Иконка" className="w-1/4 object-contain mx-auto" />
              <p className="font-semibold text-lg text-center uppercase">Европейское качество</p>
              <p className="text-[#BFBFBF] text-center text-base">
                Мы поставляем технику от ведущих мировых производителей — надёжность и долговечность в каждой детали.
              </p>
            </motion.div>

            {/* 2 */}
            <motion.div
              variants={cardItem}
              className="rounded-3xl p-6 space-y-6 text-white bg-white/[0.04] backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <img src={arm} alt="Иконка" className="w-1/4 object-contain mx-auto" />
              <p className="font-semibold text-lg text-center uppercase">Производительность</p>
              <p className="text-[#BFBFBF] text-center text-base">
                Максимальная эффективность даже в сложных условиях — наши машины не знают компромиссов.
              </p>
            </motion.div>

            {/* 3 */}
            <motion.div
              variants={cardItem}
              className="rounded-3xl p-6 space-y-6 text-white bg-white/[0.04] backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <img src={repair} alt="Иконка" className="w-1/4 object-contain mx-auto" />
              <p className="font-semibold text-lg text-center uppercase">Сервис и поддержка</p>
              <p className="text-[#BFBFBF] text-center text-base">
                Собственный сервисный центр и склад запчастей обеспечивают минимальные простои.
              </p>
            </motion.div>

            {/* 4 */}
            <motion.div
              variants={cardItem}
              className="rounded-3xl p-6 space-y-6 text-white bg-white/[0.04] backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <img src={earth} alt="Иконка" className="w-1/4 object-contain mx-auto" />
              <p className="font-semibold text-lg text-center uppercase">Экологичные решения</p>
              <p className="text-[#BFBFBF] text-center text-base">
                Современные технологии снижают расход топлива и воздействие на природу.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 25 years — без изменений */}
      <div className="py-16 min-h-screen bg-[#0e0e0e] content-center">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            variants={sectionParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={slideLeftImg} className="w-full">
              <motion.img
                src={forwarder25years}
                alt="25 лет"
                className="w-full object-contain rounded-[2rem]"
                loading="lazy"
                decoding="async"
                draggable={false}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              />
            </motion.div>

            <motion.div variants={slideRightText} className="px-2 md:px-8 content-center space-y-4 md:space-y-6 text-center">
              <motion.h2
                className="text-[#e5e5e5] font-extrabold text-lg md:text-2xl lg:text-3xl uppercase leading-tight"
                variants={fadeUp}
              >
                25 лет опыта в лесозаготовительной отрасли
              </motion.h2>
              <motion.p
                className="text-[#BFBFBF] text-sm md:text-base lg:text-lg leading-relaxed"
                variants={fadeUp}
              >
                Компания “Лесотехника” — официальный поставщик профессиональной лесозаготовительной техники. Мы обеспечиваем полный цикл — от подбора машин и финансирования до сервисного обслуживания и поставки запчастей.
              </motion.p>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-12 md:my-16"
            variants={sectionParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[forwBack, harvHead2, harvHead1].map((src, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="w-full"
              >
                <motion.img
                  src={src}
                  alt="Галерея"
                  className="w-full object-contain rounded-[2rem] ring-1 ring-white/10"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  whileHover={{ y: -6, scale: 1.015, boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Contacts />
      <Footer />
    </div>
  );
}