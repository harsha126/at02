import { Box } from "@mui/material";
import "./App.css";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box width="100%" height="100%">
                <NavBar />
                <Main />
            </Box>
        </LocalizationProvider>
    );
}

export default App;
