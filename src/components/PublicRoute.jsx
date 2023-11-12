import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { user } from "../features/User.reducer";

const PublicRoute = () => {
    const authenticated = useSelector(user);
    return !authenticated.isLogin ? (
        <Outlet />
    ) : (
        <Navigate to={`/gallery`} replace />
    );
};

export default PublicRoute;
