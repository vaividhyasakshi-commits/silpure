import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAdmin } from './AdminSession';
import { saveProduct, uploadProductImage } from '../services/adminApi';
const categories = [
  ['rings','Rings'],['earrings','Earrings'],['necklaces','Necklaces'],['bracelets','Bracelets'],['anklets','Anklets'],['toerings','Toe rings'],
  ['mens-rings',"Men's rings"],['mens-bracelet',"Men's bracelets"],['mens-chains',"Men's chains"]
];
const collections = [
  ['daily-wear','Daily wear'],['office-wear','Office wear'],['festive','Festive'],['wedding','Wedding'],
  ['for-her','Gifts for her'],['for-him','Gifts for him'],['for-mom','Gifts for mom'],['for-sis','Gifts for sister']
];
const empty = {name:'',category:'rings',price:'',oldPrice:'',shortDescription:'',description:'',image:'',material:'925 Sterling Silver',badge:'',inStock:true,isNewArrival:false,collections:[]};
export default function ProductForm() {
  const { id } = useParams();
  const edit = Boolean(id);
  const { products, loading, refreshProducts } = useProducts();
  const { csrfToken } = useAdmin();
  const navigate = useNavigate();
  const original = useMemo(()=>products.find(p=>String(p.id)===String(id)),[products,id]);
  const [form,setForm] = useState(empty);
  const [imageFile,setImageFile] = useState(null);
  const [preview,setPreview] = useState('');
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  useEffect(()=>{setForm(edit && original ? {...empty,...original,collections:Array.isArray(original.collections)?original.collections:[]} : {...empty});},[edit,original]);
  useEffect(()=>{
    if (!imageFile) {setPreview(''); return;}
    const url=URL.createObjectURL(imageFile);setPreview(url);
    return ()=>URL.revokeObjectURL(url);
  },[imageFile]);
  function set(key,value){setForm(f=>({...f,[key]:value}));}
  function toggleCollection(key){setForm(f=>({...f,collections:f.collections.includes(key)?f.collections.filter(x=>x!==key):[...f.collections,key]}));}
  async function submit(e){
    e.preventDefault();setError('');setBusy(true);
    try {
      let image=form.image;
      if(imageFile){const result=await uploadProductImage(imageFile,csrfToken); image=result.image;}
      if(!image) throw new Error('Please upload a product image');
      const payload={...form,image,price:Number(form.price),oldPrice:form.oldPrice===''?null:Number(form.oldPrice)};
      if(!edit) delete payload.id;
      await saveProduct(payload,csrfToken);
      await refreshProducts();
      navigate('/admin-panel/products');
    }catch(err){setError(err.message||'Unable to save product');}
    finally{setBusy(false);}
  }
  if(edit && loading) return <main className="sil-admin-dashboard">Loading product...</main>;
  if(edit && !original) return <main className="sil-admin-dashboard"><p>Product not found.</p><Link to="/admin-panel/products">Back to products</Link></main>;
  return <main className="sil-admin-dashboard">
    <div className="sil-admin-heading"><div><div className="sil-admin-overline">SILPURE STUDIO</div><h1>{edit?'Edit product':'Add product'}</h1><p>Saved products appear on the storefront.</p></div><Link className="sil-btn-outline" to="/admin-panel/products">← All products</Link></div>
    <form className="sil-admin-panel sil-edit-form" onSubmit={submit}>
      <div className="sil-edit-grid">
        <div className="sil-fields">
          <label>Product name<input required maxLength={180} value={form.name} onChange={e=>set('name',e.target.value)}/></label>
          <label>Category<select value={form.category} onChange={e=>set('category',e.target.value)}>{categories.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
          <div className="sil-field-row"><label>Price (₹)<input required type="number" min="0" step="0.01" value={form.price} onChange={e=>set('price',e.target.value)}/></label><label>Old price (₹)<input type="number" min="0" step="0.01" value={form.oldPrice??''} onChange={e=>set('oldPrice',e.target.value)}/></label></div>
          <label>Short description<textarea rows={3} maxLength={2000} value={form.shortDescription} onChange={e=>set('shortDescription',e.target.value)}/></label>
          <label>Full description<textarea rows={5} maxLength={10000} value={form.description??''} onChange={e=>set('description',e.target.value)}/></label>
          <div className="sil-field-row"><label>Material<input value={form.material} onChange={e=>set('material',e.target.value)}/></label><label>Badge<input placeholder="NEW / BESTSELLER" value={form.badge} onChange={e=>set('badge',e.target.value)}/></label></div>
        </div>
        <aside className="sil-image-column"><h2>Product image</h2><div className="sil-image-preview">{(preview || form.image)?<img src={preview || form.image} alt="Product preview"/>:<span>Image preview</span>}</div><label>Upload JPG, PNG or WebP<input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setImageFile(e.target.files?.[0] || null)}/></label><small>Maximum 5 MB. Existing image stays until you save.</small></aside>
      </div>
      <div className="sil-choice-box"><h2>Collections & features</h2><p>Choose additional collections where this product should appear.</p><div className="sil-checkbox-grid">{collections.map(([key,label])=><label key={key}><input type="checkbox" checked={form.collections.includes(key)} onChange={()=>toggleCollection(key)}/>{label}</label>)}</div><div className="sil-checkbox-grid"><label><input type="checkbox" checked={Boolean(form.inStock)} onChange={e=>set('inStock',e.target.checked)}/>In stock</label><label><input type="checkbox" checked={Boolean(form.isNewArrival)} onChange={e=>set('isNewArrival',e.target.checked)}/>New arrival</label></div></div>
      {error && <p role="alert" className="sil-admin-error">{error}</p>}
      <div className="sil-form-actions"><button className="sil-btn" disabled={busy} type="submit">{busy?'Saving...':edit?'Save changes':'Publish product'}</button><Link to="/admin-panel/products" className="sil-btn-outline">Cancel</Link></div>
    </form>
  </main>;
}
