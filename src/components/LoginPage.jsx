import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { GET_USER } from "../api";
import { useDispatch } from "react-redux";
import { handleToaster } from "../features/Toaster.reducer";
import { handleLogin } from "../features/User.reducer";
import Loader from "./Loader";
import { isNumberInList } from "../util";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isCLicked, setIsCLicked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [serviceNo, setServiceNo] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        serviceNo: false,
        password: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isCLicked) validateForm();
    }, [serviceNo, password]);
    function validateForm() {
        const pattern =
            /^688(196|197|198|199|2[0-9]{2}|3[0-8][0-9]|39[0-6]|095)$/;
        const er = {};
        er.serviceNo = !isNumberInList(serviceNo);
        er.password = password.length === 0;
        setErrors({ ...er });
        return er;
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    async function handleLoginForm() {
        const er = validateForm();
        if (er.serviceNo || er.password) return;
        setIsLoading(true);
        axios
            .post(GET_USER, { serviceNo, password })
            .then((res) => {
                setIsLoading(false);
                dispatch(handleLogin({ isLogin: true, _id: res.data["_id"] }));
                navigate("/profile", { state: { ...res.data } });
            })
            .catch((err) => {
                setIsLoading(false);
                dispatch(
                    handleToaster({
                        message: "User Not found",
                        severity: "error",
                        open: true,
                    })
                );
            });
    }
    return (
        <Box>
            <Paper
                sx={{
                    marginTop: "8%",
                    maxWidth: "650px",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}
            >
                <Box
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                    textAlign="center"
                    gap={2}
                >
                    {isLoading && <Loader />}
                    <Stack direction="column" spacing={3} p={3} width="400px">
                        <Typography variant="h4">Login</Typography>
                        <TextField
                            label="service no"
                            variant="outlined"
                            fullWidth
                            value={serviceNo}
                            onChange={(e) => setServiceNo(e.target.value)}
                            error={errors.serviceNo}
                            helperText={
                                errors.serviceNo ? "Enter valid service No" : ""
                            }
                        />
                        <TextField
                            error={errors.password}
                            helperText={
                                errors.password ? "Enter valid password" : ""
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                setIsCLicked(true);
                                handleLoginForm();
                            }}
                            disabled={isLoading}
                        >
                            Login
                        </Button>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>Dont have an account ?</Typography>
                            <NavLink to="/register">Register</NavLink>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginPage;
