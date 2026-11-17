import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { useShop } from "../context/ShopContext";
import { useProducts } from "../context/ProductContext";

export default function Wishlist() {
  const { wishlist } = useShop();
  const { loading, error } = useProducts();

  return (
    <>
      <Header />

      <main className="min-h-[65vh] bg-white">

        {/* PAGE HEADER */}
        <section className="bg-[var(--c-f3f7f8)] px-5 py-16 text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--c-2c7a96)]">
            Your Favourite Pieces
          </p>

          <h1
            className="mt-4 text-5xl text-[var(--c-07324b)]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            My Wishlist
          </h1>

          <p className="mt-4 text-sm text-[var(--c-69828d)]">
            Save the pieces you love.
          </p>

        </section>

        <section className="mx-auto max-w-[1450px] px-5 py-12 lg:px-10">

          {loading ? (
            <p className="py-12 text-center text-sm">
              Loading your wishlist...
            </p>
          ) : error ? (
            <p role="alert" className="text-center text-red-600">
              {error}
            </p>
          ) : wishlist.length === 0 ? (

            /* EMPTY WISHLIST */
            <div className="py-16 text-center">

              <FiHeart
                size={55}
                className="mx-auto text-[var(--c-9aadb4)]"
              />

              <h2
                className="mt-6 text-2xl text-[var(--c-07324b)]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your wishlist is empty
              </h2>

              <p className="mt-3 text-sm text-[var(--c-69828d)]">
                Tap the heart on any product to save it here.
              </p>

              <Link
                to="/new-arrivals"
                className="mt-7 inline-block bg-[var(--c-063653)] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white"
              >
                Explore Collection
              </Link>

            </div>
          ) : (
            <>
              <p className="mb-8 border-b border-gray-200 pb-5 text-sm text-[var(--c-69828d)]">
                {wishlist.length} saved{" "}
                {wishlist.length === 1 ? "piece" : "pieces"}
              </p>

              <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {wishlist.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>
            </>
          )}

        </section>
      </main>

      <Footer />
    </>
  );
}