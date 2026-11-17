import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { selectProducts } from "../services/productFilters";

import heroNewArrival from "../assets/images/new arrival/hero-new-arrival.png";

import {
  FiChevronDown,
} from "react-icons/fi";

export default function NewArrivals() {
  const { products, loading, error } = useProducts();
  const newProducts = selectProducts(products, "new-arrivals");

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* HERO */}
        <section className="relative min-h-[450px] overflow-hidden">
          <img
            src={heroNewArrival}
            alt="Silpure New Arrivals"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#001e3d]/75 via-[#001e3d]/30 to-transparent" />

          <div className="relative mx-auto flex min-h-[450px] max-w-[1450px] items-center px-5 sm:px-8 lg:px-12">
            <div className="max-w-[600px] text-white">
              <div className="mb-6 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                <Link to="/" className="hover:text-white">
                  Home
                </Link>

                <span>/</span>
                <span>New Arrivals</span>
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/80">
                Just Landed
              </p>

              <h1
                className="mt-4 text-[48px] font-normal leading-tight sm:text-[60px] lg:text-[70px]"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                New Arrivals
              </h1>

              <div className="mt-6 h-px w-16 bg-white/80" />

              <p className="mt-6 max-w-[520px] text-sm leading-7 text-white/80 sm:text-[15px]">
                Discover the newest additions to Silpure — thoughtfully
                designed sterling silver jewellery created for effortless
                modern styling.
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
                  Latest Pieces
                </p>

                <p className="mt-2 text-sm text-[var(--c-183e50)]">
                  {newProducts.length}{" "}
                  {newProducts.length === 1 ? "piece" : "pieces"}
                </p>
              </div>

              <button className="flex w-fit items-center gap-8 border border-[var(--c-dfecef)] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--c-183e50)]">
                Sort By: Newest
                <FiChevronDown size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loading && <p className="col-span-full py-10 text-center text-sm text-[#69828d]">Loading products...</p>}
              {error && <p role="alert" className="col-span-full py-10 text-center text-sm text-red-600">{error}</p>}
              {!loading && !error && newProducts.length === 0 && <p className="col-span-full py-10 text-center text-sm text-[#69828d]">No products available in this collection.</p>}
              {!loading && !error && newProducts.map((product) => (
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