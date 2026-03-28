const FOOTER_LINKS = [
  {
    title: "Shop",
    links: ["New Arrivals", "Electronics", "Fashion", "Home & Living", "Sports", "Beauty"],
  },
  {
    title: "Help",
    links: ["FAQs", "Shipping Policy", "Returns", "Track Order", "Contact Us"],
  },
  {
    title: "Company",
    links: ["About NOVA", "Careers", "Blog", "Press", "Sustainability"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xl font-semibold text-gray-900 mb-3">
              NOVA<span className="text-indigo-600">.</span>
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Clean, curated shopping for every lifestyle. Quality products, honest prices.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {["instagram", "twitter", "facebook"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-300 transition-colors"
                >
                  <span className="text-xs font-bold uppercase">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <p className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">
                {title}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-50 rounded-2xl px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-gray-900">Get 10% off your first order</p>
            <p className="text-xs text-gray-400 mt-0.5">Subscribe to our newsletter for deals and new arrivals.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 sm:w-56 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-400 bg-white"
            />
            <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            2025 NOVA Store. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-700 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
