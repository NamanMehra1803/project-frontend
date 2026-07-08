import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Admin panel components
import Login from './component/login/Login';
import Dashoborad from './component/Dashobard/Dashoborad';
import User from './component/User/User';
import UserAdd from './component/User/Add';
import UserEdit from './component/User/Edit';
import Category from './component/Category/Category';
import CategoryAdd from './component/Category/CategoryAdd';
import CategoryEdit from './component/Category/CategoryEdit';
import Profile from './component/Profile/Profile';
import ProfileEdit from './component/Profile/ProfileEdit';
import Changepass from './component/Profile/Changepass';
import Product from './component/Product/Product';
import ProductAdd from './component/Product/ProductAdd';
import ProductEdit from './component/Product/ProductEdit';
import ContactUs from './component/Contact/ContactAdmin';
import Order from './component/Order/Order';


// Frontend components
import Home from './component/frontend copy/home/Home';
import Blog from './component/frontend copy/blog/Blog';
import Contact from './component/frontend copy/contact/Contact';
import Categoriess from './component/frontend copy/categoriess/Categoriess';
import ProductDetail from './component/frontend copy/details/ProductDetail';
import CategoryDetails from './component/frontend copy/details/CategoryDetails';
import UserLogin from './component/frontend/login/loging';
import UserRegister from './component/frontend/register/register';
import UserProfile from './component/frontend/home/MyProfile';
import AddToCartSection from './component/frontend/home/AddToCartSection'
import Wishlist from './component/frontend/home/WishList'
import OrderHistory from './component/frontend/home/OrderHistory'






function App() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('admin-id');

  const ProtectedRoute = ({ element }) => {
    if (isLoggedIn) {
      return element;
    } else {
      navigate('/admin');
      return null;
    }
  };

  return (
    <Routes>
      {/* Frontend Routes */}
      <Route index element={<Home />} />
      <Route path="/user-loging" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/front-category" element={<Categoriess />} />
      <Route path="/product-detail" element={<ProductDetail />} />
      <Route path="/category-detail" element={<CategoryDetails />} />
      <Route path="/AddToCartSection-detail" element={<AddToCartSection />} />
      <Route path="/Wishlist-detail" element={<Wishlist />} />
      <Route path="/Order-detail" element={<OrderHistory />} />




      {/* Admin Routes */}
      <Route path="/admin" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashoborad />} />} />
      <Route path="/users" element={<ProtectedRoute element={<User />} />} />
      <Route path="/users-add" element={<ProtectedRoute element={<UserAdd />} />} />
      <Route path="/users-edit" element={<ProtectedRoute element={<UserEdit />} />} />
      <Route path="/category" element={<ProtectedRoute element={<Category />} />} />
      <Route path="/category-add" element={<ProtectedRoute element={<CategoryAdd />} />} />
      <Route path="/category-edit" element={<ProtectedRoute element={<CategoryEdit />} />} />
      <Route path="/myprofile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/myprofile-edit" element={<ProtectedRoute element={<ProfileEdit />} />} />
      <Route path="/changepassword" element={<ProtectedRoute element={<Changepass />} />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
      <Route path="/product-add" element={<ProtectedRoute element={<ProductAdd />} />} />
      <Route path="/product-edit" element={<ProtectedRoute element={<ProductEdit />} />} />
      <Route path="/Orders" element={<ProtectedRoute element={<Order />} />} />

    </Routes>
  );
}
export default App;
