export async function getProducts() {
  const response = await fetch("/api/products.php", { cache: "no-store" });
  if (!response.ok) throw new Error(`Product API request failed (${response.status})`);
  const data = await response.json();
  if (!data.success || !Array.isArray(data.products)) {
    throw new Error("Invalid product API response");
  }
  return data.products;
}
