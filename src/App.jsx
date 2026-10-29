import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import Rings from "./pages/Rings";
import Earrings from "./pages/Earrings";
import Necklaces from "./pages/Necklaces";
import Bracelets from "./pages/Bracelets";
import Anklets from "./pages/Anklets";
import ToeRings from "./pages/ToeRings";
import MensRings from "./pages/MensRings";
import MensBracelets from "./pages/MensBracelets";
import MensChains from "./pages/MensChains";
import DailyWear from "./pages/DailyWear";
import OfficeWear from "./pages/OfficeWear";
import Festive from "./pages/Festive";
import Wedding from "./pages/Wedding";
import GiftForHer from "./pages/GiftForHer";
import GiftForHim from "./pages/GiftForHim";
import GiftForMom from "./pages/GiftForMom";
import GiftForSister from "./pages/GiftForSister";
import Under1999 from "./pages/Under1999";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import Products from "./admin/Products";
import ProductForm from "./admin/ProductForm";
import { AdminSessionProvider } from "./admin/AdminSession";

function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL}>
    <AdminSessionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/rings" element={<Rings />} />
        <Route path="/earrings" element={<Earrings />} />
        <Route path="/necklaces" element={<Necklaces />} />
        <Route path="/bracelets" element={<Bracelets />} />
        <Route path="/anklets" element={<Anklets />} />
        <Route path="/toe-rings" element={<ToeRings />} />
        <Route path="/mens-rings" element={<MensRings />} />
        <Route path="/mens-bracelets" element={<MensBracelets />} />
        <Route path="/mens-chains" element={<MensChains />} />
        <Route path="/daily-wear" element={<DailyWear />} />
        <Route path="/office-wear" element={<OfficeWear />} />
        <Route path="/festive" element={<Festive />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/gifts-for-her" element={<GiftForHer />} />
        <Route path="/gifts-for-him" element={<GiftForHim />} />
        <Route path="/gifts-for-mom" element={<GiftForMom />} />
        <Route path="/gifts-for-sister" element={<GiftForSister />} />
        <Route path="/under-1999" element={<Under1999 />} />
        <Route path="/admin-panel/login" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </AdminSessionProvider>
  </BrowserRouter>;
}
export default App;
