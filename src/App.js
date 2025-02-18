import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import "./App.css";
import MainPage from "./MainPage";
import Cart from "./Cart";
import Favorites from "./Favorites";
import Register from "./Register";
import Login from "./Login";
import AddProduct from "./AddProduct";
import Profile from "./Profile";
import NavBar from "./NavBar";
import SubCategoriesPage from "./SubCategoriesPage";
import ProductsOfSelectedSubCategoriesPage from "./ProductsOfSelectedSubCategoriesPage";
import ProductDeteailsPage from "./ProductDeteailsPage";
import SellerPage from "./SellerPage";
import AuthContext from "./auth-context";
import { useContext } from "react";
import SellerMainPage from "./Seller/SellerMainPage";
import SearchResultPage from "./SearchResultsPage";
import SellerRegister from "./SellerRegister";
import Toast, { successToast, errorToast } from "./Toaster";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isSeller = localStorage.getItem("isSeller");

  const navTo = (comp) => {
    return isLoggedIn ? comp : <Navigate to="/login" />;
  };

  return (
    <div style={{ padding: "0px 90px 0px 90px" }}>
      <Toast></Toast>
      <NavBar />
      <Routes>
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}
        {!isLoggedIn && (
          <Route path="/sellerRegister" element={<SellerRegister />} />
        )}

        <Route
          path="*"
          element={
            <Navigate to={isSeller ? "/seller/mainPage" : "/mainPage"} />
          }
        />

        <Route path="/mainPage" element={<MainPage />} />

        {isSeller && (
          <Route path="/seller/mainPage" element={<SellerMainPage />} />
        )}

        <Route path="/cart" element={navTo(<Cart />)} />
        <Route path="/favorites" element={navTo(<Favorites />)} />
        <Route path="/profile" element={navTo(<Profile />)} />
        <Route path="/addProduct" element={navTo(<AddProduct />)} />
        <Route
          path="/category/:categoryId/:categoryName"
          element={<SubCategoriesPage />}
        />
        <Route
          path="/category/:categoryId/:categoryName/:subCategoryId/:subCategoryName"
          element={<ProductsOfSelectedSubCategoriesPage />}
        />
        <Route
          path="/manufacturer/:manufacturerId/:manufacturerName"
          element={<SellerPage />}
        />
        <Route
          path="/category/:categoryId/:subCategoryId/:productId"
          element={<ProductDeteailsPage />}
        />

        <Route path="/search/:searchInput" element={<SearchResultPage />} />
        {/* Default route for authenticated users */}
        <Route path="*" element={navTo(<Navigate to="/" />)} />
      </Routes>
    </div>
  );
}

export default App;
