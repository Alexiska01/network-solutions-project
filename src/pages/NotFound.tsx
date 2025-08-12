import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: attempted to access:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* Звёзды (псевдо-анимация через абсолютные блоки) */}
      <div className="absolute inset-0">
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 top-1/4 left-1/3 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 top-1/2 left-2/3 animate-pulse delay-200"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 top-3/4 left-1/4 animate-pulse delay-500"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-70 top-1/3 left-3/4 animate-pulse delay-700"></div>
      </div>

      <section className="mx-4 w-full max-w-2xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <span aria-hidden className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          В разработке
        </div>

        <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Раздел в разработке
        </h1>

        <p className="mt-3 text-base sm:text-lg text-gray-300">
          Новый корпоративный функционал скоро будет доступен
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            На главную
          </Link>

          <Link
            to="/contacts"
            className="inline-flex items-center rounded-xl border border-white/30 bg-transparent hover:bg-white/10 text-white px-5 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
