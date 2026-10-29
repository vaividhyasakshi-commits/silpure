import productSnapshot from "../../storage/products.json";

export async function getProducts() {
  if (import.meta.env.VITE_STATIC_CATALOG === "true") {
    return productSnapshot.map((product) => ({
      ...product,
      image: product.image?.startsWith("/uploads/")
        ? `${import.meta.env.BASE_URL}${product.image.slice(1)}`
        : product.image,
    }));
  }

  const response = await fetch("/api/products.php", { cache: "no-store" });
  if (!response.ok) throw new Error(`Product API request failed (${response.status})`);
  const data = await response.json();
  if (!data.success || !Array.isArray(data.products)) {
    throw new Error("Invalid product API response");
  }
  return data.products;
}
