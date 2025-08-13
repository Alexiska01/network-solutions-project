// PartnersHero.tsx
import "./PartnersHero.css";

const PartnersHero = () => {
  return (
    <section className="partners-hero text-white">
      <div className="mx-auto w-full max-w-[1120px] px-4 md:px-6 lg:px-8 text-center">
        <h1
          className="mb-3 font-montserrat font-extrabold leading-tight tracking-tight
                     text-[28px] md:text-5xl lg:text-6xl
                     animate-hero-title"
        >
          Наши партнёры
        </h1>

        <p
          className="mx-auto max-w-[70ch] font-montserrat font-medium leading-relaxed
                     text-[14px] md:text-lg lg:text-xl text-white/90
                     animate-hero-sub"
        >
          Мы сотрудничаем с надёжными и проверенными компаниями, которые прошли официальную
          авторизацию и обладают экспертизой в наших продуктах и решениях.
        </p>
      </div>
    </section>
  );
};

export default PartnersHero;
