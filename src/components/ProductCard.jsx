import { useState } from "react";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

const BADGE_STYLES = {
  "Best Seller": "bg-indigo-100 text-indigo-700",
  New: "bg-emerald-100 text-emerald-700",
  Sale: "bg-rose-100 text-rose-700",
};

export default function ProductCard({ product, onClick }) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    dispatch({ type: "ADD", item: product });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 h-52">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${BADGE_STYLES[product.badge] || "bg-gray-100 text-gray-600"}`}
          >
            {product.badge}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick add button */}
        {product.inStock && (
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-white text-gray-700 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            {added ? "Added ✓" : "+ Cart"}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-900 mb-2 truncate">{product.name}</h3>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-semibold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
