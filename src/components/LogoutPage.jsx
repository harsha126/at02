import React from "react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../features/User.reducer";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    dispatch(handleLogout({isLogin:false}));
    navigate("/login");
    return null;
};

export default LogoutPage;
