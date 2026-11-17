import { Link } from "react-router-dom";

import {
  FiShoppingBag,
  FiPlus,
  FiMinus,
  FiTrash2,
} from "react-icons/fi";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { useShop } from "../context/ShopContext";
import { useProducts } from "../context/ProductContext";

const formatPrice = (price) =>
  Number(price || 0).toLocaleString("en-IN");

export default function Cart() {
  const {
    cart,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
    openProduct,
  } = useShop();

  const { loading, error } = useProducts();

  return (
    <>
      <Header />

      <main className="min-h-[65vh] bg-white">

        {/* PAGE HEADER */}
        <section className="bg-[var(--c-f3f7f8)] px-5 py-16 text-center">

          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--c-2c7a96)]">
            Your Selected Pieces
          </p>

          <h1
            className="mt-4 text-5xl text-[var(--c-07324b)]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Shopping Bag
          </h1>

          <p className="mt-4 text-sm text-[var(--c-69828d)]">
            Beautiful choices, thoughtfully selected.
          </p>

        </section>

        <section className="mx-auto max-w-[1300px] px-5 py-14 lg:px-10">

          {loading ? (
            <p className="py-12 text-center text-sm">
              Loading your shopping bag...
            </p>
          ) : error ? (
            <p role="alert" className="text-center text-red-600">
              {error}
            </p>
          ) : cart.length === 0 ? (

            /* EMPTY CART */
            <div className="py-14 text-center">

              <FiShoppingBag
                size={55}
                className="mx-auto text-[var(--c-9aadb4)]"
              />

              <h2
                className="mt-6 text-2xl text-[var(--c-07324b)]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Your shopping bag is empty
              </h2>

              <p className="mt-3 text-sm text-[var(--c-69828d)]">
                Discover something beautiful for yourself.
              </p>

              <Link
                to="/new-arrivals"
                className="mt-7 inline-block bg-[var(--c-063653)] px-8 py-4 text-xs uppercase tracking-wider text-white"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            <div className="grid gap-10 lg:grid-cols-[1fr_350px]">

              {/* CART PRODUCTS */}
              <div>

                <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-[var(--c-07324b)]">
                  Shopping Bag ({cartCount})
                </h2>

                {cart.map((product) => (

                  <div
                    key={product.id}
                    className="flex flex-wrap items-start gap-4 border-b border-gray-200 py-6 sm:flex-nowrap sm:items-center"
                  >

                    {/* IMAGE */}
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="h-28 w-24 shrink-0 bg-[var(--c-f3f7f8)] sm:h-36 sm:w-32"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </button>

                    {/* INFORMATION */}
                    <div className="min-w-[140px] flex-1">

                      <button
                        type="button"
                        onClick={() => openProduct(product)}
                        className="text-left text-lg text-[var(--c-07324b)]"
                        style={{ fontFamily: "Georgia, serif" }}
                      >
                        {product.name}
                      </button>

                      <p className="mt-2 text-xs text-[var(--c-69828d)]">
                        {product.material}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[var(--c-063653)]">
                        ₹{formatPrice(product.price)}
                      </p>

                      {!product.inStock && (
                        <p className="mt-2 text-xs text-red-600">
                          Currently out of stock
                        </p>
                      )}

                      {/* QUANTITY */}
                      <div className="mt-4 flex w-fit items-center border border-gray-200">

                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              product.quantity - 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center"
                        >
                          <FiMinus size={14} />
                        </button>

                        <span className="w-9 text-center text-sm">
                          {product.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={!product.inStock}
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              product.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center disabled:opacity-40"
                        >
                          <FiPlus size={14} />
                        </button>

                      </div>
                    </div>

                    {/* TOTAL & REMOVE */}
                    <div className="ml-auto text-right">

                      <p className="font-semibold text-[var(--c-07324b)]">
                        ₹{formatPrice(
                          product.price * product.quantity
                        )}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="mt-4 inline-flex items-center gap-2 text-xs text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={15} />
                        Remove
                      </button>

                    </div>
                  </div>

                ))}

                <Link
                  to="/new-arrivals"
                  className="mt-7 inline-block border-b border-[var(--c-063653)] pb-1 text-xs font-semibold uppercase tracking-wide text-[var(--c-063653)]"
                >
                  Continue Shopping
                </Link>

              </div>

              {/* ORDER SUMMARY */}
              <aside className="h-fit bg-[var(--c-f3f7f8)] p-7">

                <h2
                  className="text-2xl text-[var(--c-07324b)]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Order Summary
                </h2>

                <div className="mt-7 space-y-4 text-sm text-[var(--c-69828d)]">

                  <div className="flex justify-between">
                    <span>Total Items</span>
                    <span>{cartCount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{formatPrice(cartTotal)}</span>
                  </div>

                </div>

                <div className="my-6 border-t border-gray-300" />

                <div className="flex justify-between text-lg font-semibold text-[var(--c-07324b)]">
                  <span>Bag Total</span>
                  <span>₹{formatPrice(cartTotal)}</span>
                </div>

                <p className="mt-5 text-xs leading-6 text-[var(--c-69828d)]">
                  Shipping and final order details will be confirmed
                  when checkout becomes available.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-6 w-full cursor-not-allowed bg-[var(--c-063653)] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white opacity-50"
                >
                  Checkout Coming Soon
                </button>

              </aside>
            </div>

          )}

        </section>
      </main>

      <Footer />
    </>
  );
}