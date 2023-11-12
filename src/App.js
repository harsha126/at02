import { Box } from "@mui/material";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Toaster from "./components/Toaster";
import LogoutPage from "./components/LogoutPage";
import LandingPage from "./components/LandingPage";
// import { useSelector } from "react-redux";
// import { user } from "./features/User.reducer";
import AboutPage from "./components/AboutPage";
import InfoPage from "./components/InfoPage";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import FriendsPage from "./components/FriendsPage";

function App() {
    // const userInfo = useSelector(user);
    return (
        <Box width="100vw" height="100vh">
            <Toaster />
            <NavBar />
            <Routes>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Main />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<Main />} />
                    <Route path="/friends" element={<FriendsPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                </Route>
                <Route path="/gallery" element={<LandingPage />} />

                <Route path="/about" element={<AboutPage />} />
                <Route path="/info" element={<InfoPage />} />
                <Route path="*" element={<Navigate replace to="/login" />} />
            </Routes>
        </Box>
    );
}

export default App;
