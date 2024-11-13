import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PathList from "./PathList";
import LoginScreen from "../Screens/LoginScreen";
import Layout from "../Screens/Layout/Layout";
import { Middleware } from "../Config/MiddleWare";
import Dashboard from "../Screens/Dashboard/Dashboard";
import UserManagement from "../Screens/UserManagement/UserManagement";
import RechargeHistory from "../Screens/RechargeHistory/RechargeHistory";
import UserDetails from "../Screens/UserManagement/UserDetails";
import BankCardHistory from "../Screens/BankCard/BankCardHistory";
import WithDrawHistory from "../Screens/WithdrawHistroy/WithDrawHistory";

const RouteList = () => {
  return (
    <Routes>
      <Route path={PathList.Login} element={<LoginScreen />} />
      <Route
        path={PathList.Dashboard}
        element={<Middleware children={<Layout element={<Dashboard />} />} />}
      />
      <Route
        path={PathList.UserManagement}
        element={
          <Middleware children={<Layout element={<UserManagement />} />} />
        }
      />
      <Route
        path={PathList.UserDetails}
        element={
          <Middleware children={<Layout element={<UserDetails />} />} />
        }
      />
      <Route
        path={PathList.RechargeHistory}
        element={
          <Middleware children={<Layout element={<RechargeHistory />} />} />
        }
      />
      <Route
        path={PathList.WithdrawHistory}
        element={
          <Middleware children={<Layout element={<WithDrawHistory />} />} />
        }
      />
      <Route
        path={PathList.BankCard}
        element={
          <Middleware children={<Layout element={<BankCardHistory />} />} />
        }
      />
    </Routes>
  );
};

export default RouteList;
