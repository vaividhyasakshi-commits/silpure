import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAdmin } from './AdminSession';
import { deleteProduct } from '../services/adminApi';

export default function Products() {
  const { products, loading, error, refreshProducts } = useProducts();
  const { csrfToken } = useAdmin();
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState('');
  const filtered = useMemo(() => products.filter(p => [p.name,p.category,p.slug].join(' ').toLowerCase().includes(search.toLowerCase())),[products,search]);
  async function remove(p) {
    if (!window.confirm(`Permanently delete “${p.name}” from the storefront?`)) return;
    setBusy(p.id); setMessage('');
    try { await deleteProduct(p.id, csrfToken); await refreshProducts(); setMessage('Product deleted.'); }
    catch (e) { setMessage(`Error: ${e.message}`); }
    finally { setBusy(null); }
  }
  return <main className="sil-admin-dashboard">
    <div className="sil-admin-heading"><div><div className="sil-admin-overline">COLLECTION MANAGEMENT</div><h1>Products</h1><p>Update your Silpure live catalogue.</p></div><Link className="sil-btn" to="/admin-panel/products/new">+ Add product</Link></div>
    <section className="sil-admin-panel sil-table-panel">
      <div className="sil-tools"><input aria-label="Search products" placeholder="Search product or category..." value={search} onChange={e=>setSearch(e.target.value)}/><span>{filtered.length} products</span></div>
      {message && <p role="status" className="sil-note">{message}</p>}
      {loading && <p>Loading products...</p>}{error && <p role="alert" className="sil-admin-error">{error}</p>}
      {!loading && !error && filtered.length===0 && <p>No matching products.</p>}
      {filtered.map(p => <div key={p.id} className="sil-table-item">
        <img src={p.image} alt=""/><div className="sil-table-description"><strong>{p.name}</strong><small>{p.category} · {p.inStock?'In stock':'Out of stock'}</small></div>
        <span>₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
        <Link className="sil-btn-outline" to={`/admin-panel/products/edit/${p.id}`}>Edit</Link>
        <button className="sil-btn-danger" disabled={busy===p.id} onClick={()=>remove(p)}>{busy===p.id?'Deleting...':'Delete'}</button>
      </div>)}
    </section>
  </main>;
}
