import { useState } from "react";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function ProductDetail({ product, onBack, onProductClick }) {
  const { dispatch } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    for (let i = 0; i < qty; i++) {
      dispatch({ type: "ADD", item: product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <button onClick={onBack} className="hover:text-gray-700 transition-colors">
            Products
          </button>
          <span>/</span>
          <span className="text-gray-500">{product.category}</span>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-gray-50 aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="lg:pt-2">
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-widest">
              {product.category}
            </span>

            <h1 className="text-3xl font-semibold text-gray-900 mt-2 mb-3">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <StarRating rating={product.rating} size="lg" />
              <span className="text-sm text-gray-500">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-light text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed mb-6 text-sm">
              {product.description}
            </p>

            {/* Features */}
            <ul className="grid grid-cols-2 gap-2 mb-8">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-emerald-400" : "bg-gray-300"}`} />
              <span className={`text-xs font-medium ${product.inStock ? "text-emerald-600" : "text-gray-400"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Qty + Add to cart */}
            {product.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-10 h-11 text-gray-500 hover:bg-gray-50 transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="w-8 text-sm font-medium text-gray-900 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-10 h-11 text-gray-500 hover:bg-gray-50 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                    added
                      ? "bg-emerald-500 text-white"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                  }`}
                >
                  {added ? "Added to Cart ✓" : "Add to Cart"}
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="border border-gray-100 rounded-xl p-4 grid grid-cols-3 divide-x divide-gray-100 text-center">
              {[
                ["Free Shipping", "Orders over $50"],
                ["Easy Returns", "30-day policy"],
                ["Secure Pay", "Encrypted checkout"],
              ].map(([title, sub]) => (
                <div key={title} className="px-3">
                  <p className="text-xs font-medium text-gray-700">{title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              More in {product.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onClick={onProductClick} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
