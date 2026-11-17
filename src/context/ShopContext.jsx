import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useProducts } from "./ProductContext";

const ShopContext = createContext(null);

function readStorage(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

const sameId = (a, b) => String(a) === String(b);

export function ShopProvider({ children }) {
  const { products } = useProducts();

  const [wishlistIds, setWishlistIds] = useState(
    () => readStorage("silpure-wishlist")
  );

  const [cartItems, setCartItems] = useState(
    () => readStorage("silpure-cart")
  );

  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "silpure-wishlist",
      JSON.stringify(wishlistIds)
    );
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem(
      "silpure-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const isWishlisted = (id) =>
    wishlistIds.some((item) => sameId(item, id));

  const toggleWishlist = (product) => {
    setWishlistIds((prev) =>
      prev.some((id) => sameId(id, product.id))
        ? prev.filter((id) => !sameId(id, product.id))
        : [...prev, product.id]
    );
  };

  const addToCart = (product, quantity = 1) => {
    if (!product.inStock) return;

    const qty = Math.max(1, Math.floor(Number(quantity) || 1));

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => sameId(item.id, product.id)
      );

      if (existing) {
        return prev.map((item) =>
          sameId(item.id, product.id)
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }

      return [...prev, { id: product.id, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => !sameId(item.id, id))
    );
  };

  const updateQuantity = (id, quantity) => {
    const qty = Math.floor(Number(quantity));

    if (!Number.isFinite(qty)) return;

    if (qty <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        sameId(item.id, id)
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const wishlist = products.filter((product) =>
    isWishlisted(product.id)
  );

  const cart = cartItems
    .map((item) => {
      const product = products.find((p) =>
        sameId(p.id, item.id)
      );

      return product
        ? { ...product, quantity: item.quantity }
        : null;
    })
    .filter(Boolean);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  const openProduct = (product) => {
    setActiveProduct(product);
  };

  const closeProduct = () => {
    setActiveProduct(null);
  };

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isWishlisted,
        toggleWishlist,

        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,

        activeProduct,
        openProduct,
        closeProduct,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used inside ShopProvider"
    );
  }

  return context;
}