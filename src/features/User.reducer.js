import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: localStorage.getItem("isLogin")==="true" };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleLogin(state, action) {
            state.isLogin = action.payload.isLogin;
            localStorage.setItem("isLogin", true);
            return state;
        },
        handleLogout(state, action) {
            state.isLogin = false;
            localStorage.setItem("isLogin", false);
            return state;
        },
    },
});

export const { handleLogin, handleLogout } = userSlice.actions;
export const user = (state) => state.user;
export default userSlice.reducer;
