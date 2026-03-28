export default function Hero({ onShopNow }) {
  return (
    <section className="bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center min-h-[520px] py-16 gap-12">

          {/* Left: Copy */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <span className="inline-block text-xs font-medium tracking-widest text-indigo-600 uppercase mb-4">
              Spring Collection 2025
            </span>
            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-tight mb-6">
              Find what<br />
              <span className="font-semibold">fits your life.</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Curated products across electronics, fashion, home, and more —
              all in one clean, fast store.
            </p>

            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={onShopNow}
                className="bg-indigo-600 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-150"
              >
                Shop Now
              </button>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1.5"
              >
                View Lookbook
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-200 justify-center lg:justify-start">
              {[
                ["12k+", "Products"],
                ["50+", "Brands"],
                ["4.8★", "Avg Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p className="text-xl font-semibold text-gray-900">{val}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 relative flex justify-center items-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Decorative layers */}
              <div className="absolute inset-0 bg-indigo-100 rounded-3xl rotate-6" />
              <div className="absolute inset-0 bg-indigo-50 rounded-3xl -rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                alt="Featured collection"
                className="relative rounded-3xl w-full h-full object-cover shadow-lg"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <p className="text-xs text-gray-400">New this week</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">24 items added</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
