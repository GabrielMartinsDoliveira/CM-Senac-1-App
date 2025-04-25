import React, { Suspense } from "react";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import CountryDetail from "../pages/countryDetail/CountryDetail";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Profile from "../pages/Profile/Profile.jsx";

export const RouterPages = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          <Route index element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route element={<ProtectedRoute redirectPath="/" />}>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/details"} element={<CountryDetail />} />
            <Route path={"/profile/:id"} element={<Profile />} />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
