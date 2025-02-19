import React, { Suspense } from "react";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Home from "../pages/home/Home";
import CountryDetail from "../pages/countryDetail/CountryDetail";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";


export const RouterPages = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Switch>
          <Route index element={<Login />} />
          <Route path={"/register"} element={<Register />} />          
          <Route path={"/home"} element={<Home/>} />
          <Route path={"/details"} element={<CountryDetail/>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
