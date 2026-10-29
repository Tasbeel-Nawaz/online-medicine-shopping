import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Login from "./Component/credentials/Login";
import Signup from "./Component/credentials/signup";
import Forget from "./Component/credentials/Forget";
import Header from "./Component/Header/Header";
import Home from "./Component/Header/Home";
import Product from "./Component/Header/product";
import Change_profile from "./Component/credentials/Change_profile";
import Customer_Control from "./Component/Admin_Dashboard/Customer_Control/customer";
import Manager_Control from "./Component/Admin_Dashboard/manager_control/manager";
import Medicine_Control from "./Component/Admin_Dashboard/Medicine_Control/medicine";
import Supplier_Control from "./Component/Admin_Dashboard/Supplier_Control/supplier";
import Medicine from "./Component/Customer_Dasshboard/Medicine_order";
import My_order from "./Component/Customer_Dasshboard/my_order";
import  Search  from "./Component/Header/search";
import Cart from "./Component/Header/cart";
import Bill from "./Component/Customer_Dasshboard/generate_bill";
function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname!=="/forget" && location.pathname!=="/change_profile";
  return (
      <div >
     {showHeader && <Header />} 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/change_profile" element={<Change_profile />} />
          <Route path="/" element = { <Home /> } />
          <Route path="/product" element = { <Product /> } />
          <Route path="/customer_control" element={<Customer_Control />} />
          <Route path="/manager" element={<Manager_Control />} />
          <Route path="/medicine_control" element={<Medicine_Control />} />
          <Route path="/suppliers" element={<Supplier_Control />} />
          <Route path="/medicines" element={<Medicine />} />
          <Route path="/my_order" element={<My_order />} />
          <Route path="/searches" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bill" element={<Bill />} />
        </Routes>
      </div>
  );
}
 function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
 }
 export default App;
