import {
    Box,
    Divider,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../features/User.reducer";
import { handleToaster } from "../features/Toaster.reducer";

const ImageBox = ({ title, image, link }) => {
    const userInfo = useSelector(user);
    const dispatch = useDispatch();
    const images = [1, 2, 3, 4, 5].map((num) => {
        let pic;
        try {
            pic = require(`./../assets/${image} (${num}).jpg`);
        } catch (error) {
            pic = require(`./../assets/${image} (${num}).JPG`);
        }
        return (
            <Grid
                item
                xs={12}
                md={4}
                sm={6}
                key={`./../assets/${image} (${num}).jpg`}
                alignItems='center'
                display='flex'
                justifyContent='center'
                padding={2}
            >
                <img src={pic} height="250px"/>
            </Grid>
        );
    });
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
                    padding={3}
                >
                    <Typography variant="title"  fontSize='20px' fontWeight='bold'>{title}</Typography>
                </Box>
                <Divider variant="fullWidth" />
                <Grid container>
                    {images}
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
                                cursor:'pointer'
                            }}
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
