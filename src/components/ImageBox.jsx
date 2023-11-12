import {
    Box,
    Divider,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Link,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../features/User.reducer";
import { handleToaster } from "../features/Toaster.reducer";

const ImageBox = ({ title, images, link }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const userInfo = useSelector(user);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <Box
                data-id={title}
                sx={{
                    width: "fit-content",
                    p: 1,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    id={title}
                >
                    <Typography variant="title">{title}</Typography>
                </Box>
                <Divider variant="fullWidth" />
                <Grid container>
                    <Grid item xs={12} md={4} sm={6}>
                        <img src="https://picsum.photos/200" />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <img src="https://picsum.photos/200" />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <img src="https://picsum.photos/200" />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <img src="https://picsum.photos/200" />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <img src="https://picsum.photos/200" />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <Box
                            width="100%"
                            height="100%"
                            sx={{
                                bgcolor: "rgba(255,255,255,0.3)",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,0.5)",
                                },
                                transition: "0.3s",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography>
                                <Link
                                    onClick={() => {
                                        if (userInfo.isLogin) {
                                            window.open(link, "_blank");
                                        } else {
                                            dispatch(
                                                handleToaster({
                                                    message: "Please login",
                                                    severity: "warning",
                                                    open: true,
                                                })
                                            );
                                        }
                                    }}
                                >
                                    View More
                                </Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ImageBox;
