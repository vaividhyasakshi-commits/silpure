import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import { selectProducts } from "../services/productFilters";

import heroImage from "../assets/images/festive/hero-festive.png";

import {
  FiHeart,
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";

export default function Festive() {
  const { products, loading, error } = useProducts();
  const pageProducts = selectProducts(products, "festive");

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* HERO */}
        <section className="relative min-h-[450px] overflow-hidden">
          <img
            src={heroImage}
            alt="Festive Edit - Silpure"
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
                <span>Festive Edit</span>
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/80">
                Celebrate In Silver
              </p>

              <h1
                className="mt-4 text-[44px] font-normal leading-tight sm:text-[58px] lg:text-[68px]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Festive Edit
              </h1>

              <div className="mt-6 h-px w-16 bg-white/80" />

              <p className="mt-6 max-w-[530px] text-sm leading-7 text-white/80 sm:text-[15px]">
                Sparkling pieces designed to complement festive moments, celebrations and special evenings.
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
                <article key={product.id} className="group">
                  <div className="relative overflow-hidden bg-[var(--c-f3f7f8)]">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-[1.05]"
                      />
                    </div>

                    {product.badge && (
                      <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-[var(--c-073650)] shadow-sm">
                        {product.badge}
                      </span>
                    )}

                    <button
                      type="button"
                      aria-label={`Add ${product.name} to wishlist`}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--c-143e52)] shadow-sm transition hover:bg-[var(--c-063653)] hover:text-white"
                    >
                      <FiHeart size={17} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 translate-y-full px-4 pb-4 transition duration-300 group-hover:translate-y-0">
                      <Link
                        to={`/product/${product.slug}`}
                        className="flex w-full items-center justify-center gap-2 bg-[var(--c-063653)] py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        View Product
                        <FiArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                  <div className="px-2 pt-5 text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--c-2c7a96)]">
                      {product.material}
                    </p>

                    <Link to={`/product/${product.slug}`}>
                      <h2
                        className="mt-2 text-[19px] font-normal text-[var(--c-07324b)] transition hover:text-[var(--c-087ca7)]"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        {product.name}
                      </h2>
                    </Link>

                    <p className="mx-auto mt-3 max-w-[320px] text-xs leading-5 text-[var(--c-69828d)]">
                      {product.shortDescription}
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-2">
                      <span className="text-sm font-semibold text-[var(--c-082f49)]">
                        ₹{Number(product.price || 0).toLocaleString("en-IN")}
                      </span>

                      {product.oldPrice && (
                        <span className="text-xs text-[var(--c-9aadb4)] line-through">
                          ₹{Number(product.oldPrice || 0).toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    <p
                      className={`mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] ${product.inStock ? "text-emerald-700" : "text-red-500"}`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
