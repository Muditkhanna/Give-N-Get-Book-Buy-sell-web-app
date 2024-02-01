import { Routes,Route } from "react-router-dom";
//pages
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ListingPage from "./pages/Listings";
import HomePage from "./pages/Home";
import BookDetailPage from "./pages/Details";
import OrderPage from "./pages/OrderPage";
import ViewOrderDetails from "./pages/ViewOrderDetail";
//css
import "bootstrap/dist/css/bootstrap.min.css";
//navbar
import MyNavbar from "./components/Navbar";
function App() {
  return (
  <div>
    <MyNavbar/>
    <Routes> 
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/book/list" element={<ListingPage/>}/>
    <Route path="book/view/:bookId" element={<BookDetailPage/>}/>
    <Route path="/book/orders" element={<OrderPage/>}/>
    <Route path="/book/orders/:bookId"element={<ViewOrderDetails/>}/>
  </Routes>
  </div>
  )
}

export default App;
