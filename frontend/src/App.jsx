
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "./Pages/Home"
import {Login} from "./Pages/Login"
import {Signup} from "./Pages/Signup"
import { Navbar } from "./Components/Navbar"
import { useAuthContext } from "./AuthContext/authContext.jsx"
import { Toaster } from "react-hot-toast"
import AdminPage from "./Pages/AdminPage.jsx"
import CreateProducts from "./Components/CreateProducts.jsx"
import { useSelector } from "react-redux"
import { ProductsByCategory } from "./Pages/ProductsByCategory.jsx"
import ProductDetails from "./Pages/ProductDetails.jsx"
import CartPage from "./Pages/CartPage.jsx"
import { PurchaseSuccessPage } from "./Pages/PurchaseSuccessPage.jsx"


function App() {
 
  const {authUser}=useAuthContext()
  const navigate=useNavigate()
  

  return (
   <div className="flex flex-col 
   min-h-screen w-full bg-gray-900 text-white  overflow-hidden mx-auto  border-blue-500">
    <Toaster position="top-right"/>
<Navbar/>
    <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/login" element={authUser?<Navigate to="/"/>:<Login/>}/>
      <Route path="/signup" element={authUser?<Navigate to="/"/>:<Signup/>}/>
      
      <Route path="/admin" element={(authUser && authUser.role==='admin')? (<AdminPage/>):(<Navigate to={"/"}/>)}/>
      <Route path="/cart" element={authUser? <CartPage/> : <Home/>}/>
      <Route path="/category/:category" element={<ProductsByCategory/>}/>
      <Route path="/category/:category/:productId" element={<ProductDetails/>}/>
      <Route path="/purchase-success" element={<PurchaseSuccessPage/>}/>
    </Routes>

   </div>
    
  )
}

export default App
