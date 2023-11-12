import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { redirect, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, user } from "../features/User.reducer";

const NavBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const userInfo = useSelector(user);
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        padding: 2,
        justifyContent: "flex-end",
    }));
    const [isOpen, setIsOpen] = React.useState(false);
    const handleDrawerClose = () => {
        setIsOpen(false);
    };
    const navigate = useNavigate();
    function navigateToPage(index) {
        if (index === 0) navigate("/friends");
        if (index === 1) navigate("/gallery");
        if (index === 2) navigate("/info");
        if (index === 3) navigate("/about");
    }
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsOpen(open);
    };
    const list = (anchor) => (
        <Box
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {/* {userInfo.isLogin && (
                <List>
                    {[
                        "Service Particulars",
                        "Work Info",
                        "Family Info",
                        "Photos",
                    ].map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
            <Divider /> */}
            <List>
                {[
                    "AT02 Friends",
                    "gallery",
                    // "1st Reunion",
                    // "2nd Reunion",
                    // "3rd Reunion",
                    // "4th Reunion",
                    // "5th Reunion",
                    // "6th Reunion",
                    // "7th Reunion",
                    // "8th Reunion",
                    // "9th Reunion",
                    // "10th Reunion",
                    "Air force info",
                    "About",
                ].map((text, index) => (
                    <ListItem key={text}>
                        <ListItemButton
                            onClick={() => {
                                navigateToPage(index);
                            }}
                        >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                        onClick={() => {
                            if (userInfo.isLogin) setIsOpen(true);
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src="./logo.png" className="logo" />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        AT02
                    </Typography>
                    {!userInfo.isLogin && (
                        <Button
                            color="inherit"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    )}
                    {userInfo.isLogin && (
                        <Button
                            color="inherit"
                            onClick={() => {
                                dispatch(handleLogout({}));
                                navigate("/login");
                            }}
                        >
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={"left"}
                open={isOpen}
                onClose={toggleDrawer(false)}
                variant="persistent"
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {list("left")}
            </Drawer>
        </Box>
    );
};

export default NavBar;
