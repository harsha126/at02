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
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, user } from "../features/User.reducer";
import { reunionMappings } from "../data/reunion";

const NavBar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const userInfo = useSelector(user);
    const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
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
    function navigateToGallery(text) {
        navigate("/" + text);
    }
    function navigateToPage(index) {
        if (index === 0) navigate("/friends");
        if (index === 1) navigate("/info");
        if (index === 2) navigate("/about");
        if (index === 3) navigate("/profile");
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
            <List>
                {Object.keys(reunionMappings).map((text, index) => (
                    <ListItem key={text}>
                        <ListItemButton
                            onClick={() => {
                                navigateToGallery(text);
                            }}
                        >
                            <ListItemText primary={reunionMappings[text]} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {["AT02 Friends", "Air force info", "About", "profile"].map(
                    (text, index) => (
                        <ListItem key={text}>
                            <ListItemButton
                                onClick={() => {
                                    navigateToPage(index);
                                }}
                            >
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    )
                )}
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
                    <img src="./logo.PNG" className="logo" />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        AT02
                    </Typography>
                    {greaterThanMid && (
                        <Box
                            sx={{
                                marginRight: 3,
                            }}
                        >
                            <Button
                                color="inherit"
                                onClick={() => navigate("/about")}
                            >
                                About
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => navigate("/info")}
                            >
                                USEFULL INFO
                            </Button>
                        </Box>
                    )}
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
