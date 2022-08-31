import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Components/Pages/HomePage/Home";
import ErrorPage from "./Components/Pages/ErrorPage/ErrorPage";
import "./App.scss";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RegisterFormPage from "./Components/Pages/RegisterFormPage/RegisterFormPage";
import SessionFormPage from "./Components/Pages/SessionFormPage/SessionFormPage";
import { AuthProvider } from "./Components/Context/AuthContext";
import ProductPage from "./Components/Pages/ProductPage/ProductPage";
import ProductsCityPage from "./Components/Pages/ProductsCityPage/ProductsCityPage";
import ProductsDatePage from "./Components/Pages/ProductsDatePage/ProductsDatePage";
import ProductsCityDatePage from "./Components/Pages/ProductsCityDatePage/ProductsCityDatePage";
import ProductsCategoryPage from "./Components/Pages/ProductsCategoryPage/ProductsCategoryPage";
import SuccessBookingPage from "./Components/Pages/SuccessBookingPage/SuccessBooking";
import BookingsFormPage from "./Components/Pages/BookingsFormPage/BookingsFormPage";
import ConfirmEmailPage from "./Components/Pages/ConfirmEmailPage/ConfirmEmailPage";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import FavoritesPage from "./Components/Pages/FavoritesPage/FavoritesPage";
import MyBookingPage from "./Components/Pages/MyBookingPage/MyBookingPage";
import AddProductFormPage from "./Components/Pages/AddProductFormPage/AddProductFormPage";
import SuccessAddProductPage from "./Components/Pages/SuccessAddProductPage/SuccessAddProductPage";
import MyProductPage from "./Components/Pages/MyProductPage/MyProductPage";
import AdminPage from "./Components/Pages/AdminPage/AdminPage";
import { ScoreProvider } from "./Components/ScoreContext/ScoreContext";
import ProtectedRole from "./Components/ProtectedRole/ProtectedRole";


function App() {

  return (
    <div className="App app--container">
      <HashRouter>
        <AuthProvider>
          <ScoreProvider>
          <Header />
          <Routes>
            <Route path="/product/:productName/:productId/booking" element={<ProtectedRoutes/>}>
              <Route path="/product/:productName/:productId/booking" element={<BookingsFormPage/>}/>
            </Route>
            <Route path="/product/:productName/:productId" element={<ProductPage />}/>
            <Route path="/confirm-email/:userEmail" element={<ConfirmEmailPage />}/>
            <Route path="/product/city_daterange" element={<ProductsCityDatePage />}/>
            <Route path="/product/category" element={<ProductsCategoryPage />}/>
            <Route path="/product/daterange" element={<ProductsDatePage />}/>
            <Route path="/product/city" element={<ProductsCityPage />}/>
            <Route path="/my_booking/:username" element={<MyBookingPage />}/>
            <Route path="/favorites/:username" element={<FavoritesPage />}/>
            <Route path="/admin/:username" element={<ProtectedRole/>}>
              <Route path="/admin/:username" element={<AdminPage />}>
                <Route path="add_product" element={<AddProductFormPage />}/>
                <Route path="my_products" element={<MyProductPage />}/>
              </Route>
            </Route>
            <Route path="/success_add_product" element={<SuccessAddProductPage />}/>
            <Route path="/success" element={<SuccessBookingPage />}/>
            <Route path="/session" element={<SessionFormPage />}/>
            <Route path="/register" element={<RegisterFormPage />}/>
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
          <Footer />
          </ScoreProvider>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;
