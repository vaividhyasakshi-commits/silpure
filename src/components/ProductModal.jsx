import { useEffect, useRef, useState } from "react";

import {
  FiX,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";

import { useShop } from "../context/ShopContext";

export default function ProductModal() {
  const { activeProduct } = useShop();

  if (!activeProduct) return null;

  return (
    <ProductDetails
      key={activeProduct.id}
      product={activeProduct}
    />
  );
}

function ProductDetails({ product }) {
  const {
    closeProduct,
    toggleWishlist,
    isWishlisted,
    addToCart,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const dialogRef = useRef(null);

  const liked = isWishlisted(product.id);

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  const discount =
    oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="silpure-product-title"
      onCancel={(event) => {
        event.preventDefault();
        closeProduct();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeProduct();
        }
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[94%] max-w-[950px] overflow-y-auto border-0 bg-white p-0 shadow-2xl backdrop:bg-black/60"
    >

      <div className="relative grid md:grid-cols-2">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={closeProduct}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#063653] shadow-md"
        >
          <FiX size={23} />
        </button>

        {/* PRODUCT IMAGE */}
        <div className="flex items-center justify-center bg-[#f3f7f8] p-6 md:p-10">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-contain"
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="p-6 md:p-10">

          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--c-2c7a96)]">
            Silpure Collection
          </p>

          <h2
            id="silpure-product-title"
            className="mt-3 pr-5 text-3xl leading-tight text-[var(--c-07324b)]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {product.name}
          </h2>

          <p className="mt-3 text-sm text-[var(--c-69828d)]">
            {product.material}
          </p>

          {/* PRICE */}
          <div className="mt-5 flex flex-wrap items-center gap-3">

            <span className="text-2xl font-semibold text-[var(--c-063653)]">
              ₹{price.toLocaleString("en-IN")}
            </span>

            {oldPrice > price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{oldPrice.toLocaleString("en-IN")}
              </span>
            )}

            {discount > 0 && (
              <span className="bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {discount}% OFF
              </span>
            )}

          </div>

          <p className="mt-5 text-sm leading-7 text-[var(--c-69828d)]">
            {product.shortDescription}
          </p>

          <div className="my-6 border-t border-gray-200" />

          {/* FULL DESCRIPTION */}
          <h3 className="text-sm font-semibold text-[var(--c-07324b)]">
            Product Details
          </h3>

          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--c-69828d)]">
            {product.fullDescription ||
              product.longDescription ||
              product.description ||
              product.shortDescription}
          </p>

          {/* STOCK */}
          <p
            className={`mt-5 text-xs font-medium ${
              product.inStock
                ? "text-emerald-700"
                : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          {/* QUANTITY */}
          <div className="mt-5 flex items-center gap-4">

            <span className="text-sm font-medium text-[var(--c-07324b)]">
              Quantity
            </span>

            <div className="flex items-center border border-gray-200">

              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => {
                  setQuantity((prev) => Math.max(1, prev - 1));
                  setAdded(false);
                }}
                className="flex h-10 w-10 items-center justify-center disabled:opacity-30"
              >
                <FiMinus />
              </button>

              <span className="w-10 text-center text-sm">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  setAdded(false);
                }}
                className="flex h-10 w-10 items-center justify-center"
              >
                <FiPlus />
              </button>

            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex gap-3">

            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-3 bg-[var(--c-063653)] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-40"
            >
              {added ? <FiCheck /> : <FiShoppingBag />}

              {added
                ? "Add More to Cart"
                : product.inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
            </button>

            <button
              type="button"
              aria-label="Toggle wishlist"
              aria-pressed={liked}
              onClick={() => toggleWishlist(product)}
              className={`flex w-14 items-center justify-center border border-[var(--c-063653)] ${
                liked ? "text-red-500" : "text-[#063653]"
              }`}
            >
              <FiHeart
                size={22}
                fill={liked ? "currentColor" : "none"}
              />
            </button>

          </div>

          {added && (
            <p
              role="status"
              className="mt-3 text-xs text-emerald-700"
            >
              Product added to your shopping bag.
            </p>
          )}

        </div>
      </div>
    </dialog>
  );
}