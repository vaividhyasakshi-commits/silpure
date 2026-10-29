import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
export default function Dashboard() {
  const { products, loading, error, refreshProducts } = useProducts();
  const categories = useMemo(() => new Set(products.map(p => p.category)).size, [products]);
  const inStock = products.filter(p => p.inStock).length;
  const latest = [...products].reverse().slice(0, 5);
  return <main className="sil-admin-dashboard">
    <div className="sil-admin-heading"><div><div className="sil-admin-overline">COLLECTION OVERVIEW</div><h1>Dashboard</h1><p>Your jewellery collection at a glance.</p></div><button onClick={refreshProducts}>↻ Refresh products</button></div>
    {loading && <p>Loading products...</p>}
    {error && <p role="alert" className="sil-admin-error">API error: {error}</p>}
    <div className="sil-admin-stats">
      <div><span>Total products</span><strong>{products.length}</strong></div>
      <div><span>Categories in use</span><strong>{categories}</strong></div>
      <div><span>In stock</span><strong>{inStock}</strong></div>
      <div><span>New arrivals</span><strong>{products.filter(p=>p.isNewArrival).length}</strong></div>
    </div>
    <section className="sil-admin-panel"><div className="sil-admin-section-top"><h2>Recently listed products</h2><span>Live API data</span></div>
      {!loading && !error && latest.length === 0 && <p>No products available.</p>}
      {latest.map(p => <div className="sil-admin-product" key={p.id}><img src={p.image} alt="" /><div><strong>{p.name}</strong><span>{p.category} · {p.inStock ? "In stock" : "Out of stock"}</span></div><b>₹{Number(p.price || 0).toLocaleString("en-IN")}</b></div>)}
    </section>
    <p className="sil-admin-footnote"><Link to="/admin-panel/products">Manage all products →</Link></p>
  </main>;
}
