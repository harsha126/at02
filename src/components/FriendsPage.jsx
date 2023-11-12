import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL } from "../api";
import styled from "styled-components";

const FriendsPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(GET_ALL)
            .then((res) => {
                setAllUsers(res.data);
            })
            .catch((err) => {
                navigate(-1);
            });
    }, []);

    return (
        <Grid
            container
            sx={{
                margin: 2,
                padding: 2,
            }}
        >
            {allUsers.map((user) => (
                <>
                    <Grid item xs={12} md={3} sm={6} lg={3}>
                        <Card sx={{ maxWidth: 250, p: 2, m: 2 }}>
                            <CardMedia
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "120px",
                                        width: "120px",
                                        borderRadius: "50%",
                                        overflow: "hidden",
                                        display: "inline-block",
                                        margin: "auto",
                                        padding: "8px",
                                        background:
                                            "linear-gradient(130deg, #74b9ff, #e66767)",
                                        borderRadius: "50%",
                                        animation:
                                            "bgcolorChange 2s linear infinite",
                                    }}
                                >
                                    <img
                                        src={user.newImage}
                                        height="120px"
                                        width="120px"
                                        style={{
                                            display: "block",
                                            width: "120px",
                                            height: "120px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </Box>
                            </CardMedia>
                            <CardContent>
                                <Typography
                                    variant="h7"
                                    component="div"
                                    textAlign="left"
                                >
                                    Name : {user.name}
                                </Typography>
                                <br></br>
                                <Typography
                                    variant="h7"
                                    component="div"
                                    textAlign="left"
                                >
                                    Service No : {user.serviceNo}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </>
            ))}
        </Grid>
    );
};

export default FriendsPage;
