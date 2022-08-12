import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { LayoutContainer } from "./Layout/LayoutContainer";
import { Route, Routes } from "react-router-dom";
import { HomeContainer } from "./pages/Home/HomeContainer";
import { CategoryContainer } from "./pages/Category/CategoryContainer";
import { LoginRegisterContainer } from "./pages/LoginRegister/LoginRegisterContainer";

function App() {
  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/category" element={<CategoryContainer />} />
        <Route path="/login" element={<LoginRegisterContainer />} />
      </Routes>
    </LayoutContainer>
  );
}

export default App;
