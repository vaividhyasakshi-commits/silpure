import { Navigate, Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logoutAdmin } from '../services/adminApi';
import { useAdmin } from './AdminSession';
import './Admin.css';
export default function AdminLayout(){
 const {authenticated,loading,username,csrfToken,refreshSession}=useAdmin();
 const [busy,setBusy]=useState(false);const navigate=useNavigate();
 if(loading)return <div className="sil-admin-center">Loading Silpure admin...</div>;
 if(!authenticated)return <Navigate to="/admin-panel/login" replace/>;
 async function logout(){setBusy(true);try{await logoutAdmin(csrfToken);await refreshSession();navigate('/admin-panel/login',{replace:true});}catch(e){alert(e.message)}finally{setBusy(false)}}
 return <div className="sil-admin-shell"><aside className="sil-admin-sidebar"><Link to="/admin-panel" className="sil-admin-brand">SILPURE <span>STUDIO</span></Link><span className="sil-admin-overline">MANAGEMENT</span><NavLink end className={({isActive})=>isActive?'sil-admin-nav-active':'sil-admin-nav'} to="/admin-panel">◫ &nbsp; Dashboard</NavLink><NavLink className={({isActive})=>isActive?'sil-admin-nav-active':'sil-admin-nav'} to="/admin-panel/products">◇ &nbsp; Products</NavLink><NavLink className={({isActive})=>isActive?'sil-admin-nav-active':'sil-admin-nav'} to="/admin-panel/products/new">＋ &nbsp; Add Product</NavLink><Link className="sil-admin-store-link" to="/">↗ &nbsp; View storefront</Link></aside><div className="sil-admin-main"><header className="sil-admin-topbar"><span>Silpure Administration</span><div><span className="sil-admin-user">{username}</span><button onClick={logout} disabled={busy}>{busy?'Logging out...':'Log out'}</button></div></header><Outlet/></div></div>;
}
