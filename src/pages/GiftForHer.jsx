import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { selectProducts } from "../services/productFilters";

import heroImage from "../assets/images/for-her/hero-for-her.png";

import {
  FiChevronDown,
} from "react-icons/fi";

export default function GiftForHer() {
  const { products, loading, error } = useProducts();
  const pageProducts = selectProducts(products, "for-her");

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* HERO */}
        <section className="relative min-h-[450px] overflow-hidden">
          <img
            src={heroImage}
            alt="Gifts For Her - Silpure"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#001e3d]/78 via-[#001e3d]/34 to-transparent" />

          <div className="relative mx-auto flex min-h-[450px] max-w-[1450px] items-center px-5 sm:px-8 lg:px-12">
            <div className="max-w-[610px] text-white">
              <div className="mb-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>

                <span>/</span>
                <span>Gifts For Her</span>
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/80">
                Thoughtfully Chosen
              </p>

              <h1
                className="mt-4 text-[44px] font-normal leading-tight sm:text-[58px] lg:text-[68px]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Gifts For Her
              </h1>

              <div className="mt-6 h-px w-16 bg-white/80" />

              <p className="mt-6 max-w-[530px] text-sm leading-7 text-white/80 sm:text-[15px]">
                Meaningful jewellery gifts selected to celebrate her style, story and special moments.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="px-5 py-16 sm:px-7 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[1450px]">
            <div className="mb-10 flex flex-col gap-5 border-b border-[var(--c-e1ecef)] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--c-8399a2)]">
                  Silpure Collection
                </p>

                <p className="mt-2 text-sm text-[var(--c-183e50)]">
                  {pageProducts.length} {pageProducts.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              <button
                type="button"
                className="flex w-fit items-center gap-8 border border-[var(--c-dfecef)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--c-183e50)]"
              >
                Sort By: Featured
                <FiChevronDown size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loading && <p className="col-span-full py-10 text-center text-sm text-[#69828d]">Loading products...</p>}
              {error && <p role="alert" className="col-span-full py-10 text-center text-sm text-red-600">{error}</p>}
              {!loading && !error && pageProducts.length === 0 && <p className="col-span-full py-10 text-center text-sm text-[#69828d]">No products available in this collection.</p>}
              {!loading && !error && pageProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
