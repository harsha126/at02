import { Box } from "@mui/material";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Toaster from "./components/Toaster";
import { Logout } from "@mui/icons-material";
import LogoutPage from "./components/LogoutPage";

function App() {
    return (
        <Box width="100%" height="100%">
            <Toaster />
            <NavBar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Main />} />
                <Route path="/profile" element={<Main />} />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
        </Box>
    );
}

export default App;
