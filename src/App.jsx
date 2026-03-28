import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";

export default function App() {
  const [page, setPage] = useState("home");       // "home" | "detail" | "checkout"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const goHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-gray-900">

        {/* Global Navbar */}
        <Navbar
          onCartOpen={() => setCartOpen(true)}
          onLogoClick={goHome}
        />

        {/* Pages */}
        {page === "home" && (
          <Home onProductClick={handleProductClick} />
        )}

        {page === "detail" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={goHome}
            onProductClick={handleProductClick}
          />
        )}

        {page === "checkout" && (
          <Checkout onBack={goHome} />
        )}

        {/* Cart Drawer */}
        <Cart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={handleCheckout}
        />
      </div>
    </CartProvider>
  );
}
