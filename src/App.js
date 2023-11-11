import { Box } from "@mui/material";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Toaster from "./components/Toaster";
import { Logout } from "@mui/icons-material";
import LogoutPage from "./components/LogoutPage";
import LandingPage from "./components/LandingPage";
import { useSelector } from "react-redux";
import { user } from "./features/User.reducer";
import AboutPage from "./components/AboutPage";

function App() {
    const userInfo = useSelector(user);
    return (
        <Box width="100vw" height="100vh">
            <Toaster />
            <NavBar />
            <Routes>
                {!userInfo.isLogin && (
                    <Route path="/login" element={<LoginPage />} />
                )}
                <Route path="/register" element={<Main />} />
                {userInfo.isLogin && (
                    <Route path="/profile" element={<Main />} />
                )}
                {userInfo.isLogin && (
                    <Route path="/logout" element={<LogoutPage />} />
                )}
                {userInfo.isLogin && (
                    <Route path="/gallery" element={<LandingPage />} />
                )}
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        </Box>
    );
}

export default App;
