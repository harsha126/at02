import React from "react";
import { useSelector } from "react-redux";
import { user } from "../features/User.reducer";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isLogin } = useSelector(user);
    if (isLogin) return <Outlet />;
    else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
