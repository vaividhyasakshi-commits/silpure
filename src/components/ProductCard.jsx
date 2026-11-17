import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { useShop } from "../context/ShopContext";

export default function ProductCard({ product, className = "" }) {
  const {
    isWishlisted,
    toggleWishlist,
    addToCart,
    openProduct,
    cart,
  } = useShop();

  const liked = isWishlisted(product.id);

  const inCart = cart.some(
    (item) => String(item.id) === String(product.id)
  );

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  return (
    <article className={`group min-w-0 ${className}`}>

      {/* PRODUCT IMAGE */}
      <div className="relative overflow-hidden bg-[var(--c-f3f7f8)]">

        <button
          type="button"
          onClick={() => openProduct(product)}
          className="block aspect-[4/5] w-full overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain p-5 transition duration-700 group-hover:scale-105"
          />
        </button>

        {/* BADGE */}
        {product.badge && (
          <span className="absolute left-4 top-4 bg-white px-3 py-2 text-[9px] font-semibold uppercase tracking-wider text-[var(--c-073650)] shadow-sm">
            {product.badge}
          </span>
        )}

        {/* WISHLIST HEART */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            liked ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={liked}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
            liked
              ? "text-red-500"
              : "text-[var(--c-143e52)]"
          }`}
        >
          <FiHeart
            size={19}
            fill={liked ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="px-2 pt-5 text-center">

        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[var(--c-2c7a96)]">
          {product.material}
        </p>

        <button
          type="button"
          onClick={() => openProduct(product)}
          className="mt-2 text-[19px] text-[var(--c-07324b)] transition hover:text-[var(--c-087ca7)]"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {product.name}
        </button>

        <p className="mx-auto mt-3 max-w-[320px] text-xs leading-5 text-[var(--c-69828d)]">
          {product.shortDescription}
        </p>

        {/* PRICE */}
        <div className="mt-4 flex items-center justify-center gap-2">

          <span className="text-sm font-semibold text-[var(--c-082f49)]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          {oldPrice > price && (
            <span className="text-xs text-[var(--c-9aadb4)] line-through">
              ₹{oldPrice.toLocaleString("en-IN")}
            </span>
          )}

        </div>

        {/* STOCK */}
        <p
          className={`mt-3 text-[10px] font-semibold uppercase tracking-wider ${
            product.inStock
              ? "text-emerald-700"
              : "text-red-500"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* PRODUCT BUTTONS */}
        <div className="mt-4 grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={() => openProduct(product)}
            className="flex min-h-[44px] items-center justify-center border border-[var(--c-063653)] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--c-063653)] transition hover:bg-[var(--c-eef7f9)]"
          >
            View Product
          </button>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
            className="flex min-h-[44px] items-center justify-center gap-2 bg-[var(--c-063653)] px-2 py-3 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <FiShoppingBag size={14} />

            {!product.inStock
              ? "Sold Out"
              : inCart
                ? "Add More"
                : "Add to Cart"}
          </button>

        </div>
      </div>
    </article>
  );
}