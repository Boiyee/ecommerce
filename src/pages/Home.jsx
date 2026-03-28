import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

export default function Home({ onProductClick }) {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero onShopNow={scrollToProducts} />
      <div id="products">
        <ProductGrid onProductClick={onProductClick} />
      </div>
      <Footer />
    </>
  );
}
