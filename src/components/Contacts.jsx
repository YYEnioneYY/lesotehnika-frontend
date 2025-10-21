export default function Contacts() {
  return (
    <>
      <div className="py-16 min-h-screen bg-[linear-gradient(to_bottom,_#0e0e0e_0%,_#333333_100%)] content-center">
        <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full rounded-2xl overflow-hidden ring-1 ring-white/10">
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A4039e9be60104663c78ee7dcdd2ff5f216364af4963bd9c37c2f6cb24ff95cd1&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
            </div>
            <div className="px-8 content-center space-y-4">
              <h2 className="text-[#e5e5e5] font-extrabold text-md text-center uppercase md:text-2xl lg:text-3xl">Связаться с нами</h2>
              <p className="text-[#BFBFBF] text-center text-sm md:text-md lg:text-lg">📍 Адрес: г. Санкт-Петербург, Мурино, д.7, к.2 </p>
              <p className="text-[#BFBFBF] text-center text-sm md:text-md lg:text-lg">📞 Телефон: +7 (921) 933-42-28 </p>
              <p className="text-[#BFBFBF] text-center text-sm md:text-md lg:text-lg">✉ Почта: info@lesotehnika.ru </p>
              <p className="text-[#BFBFBF] text-center text-sm md:text-md lg:text-lg">🕒 Время работы: Пн–Пт 9:00–18:00 </p>
            </div>
          </div>
        </div>
      </div>   
    </>
  );
}