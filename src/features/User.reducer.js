import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: localStorage.getItem("isLogin") === "true",
    _id: localStorage.getItem("_id"),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        handleLogin(state, action) {
            state.isLogin = action.payload.isLogin;
            state._id = action.payload["_id"];
            localStorage.setItem("isLogin", true);
            localStorage.setItem("_id", action.payload["_id"]);
            return state;
        },
        handleLogout(state, action) {
            state.isLogin = false;
            localStorage.setItem("isLogin", false);
            localStorage.setItem("_id", "");
            return state;
        },
    },
    
});

export const { handleLogin, handleLogout } = userSlice.actions;
export const user = (state) => state.user;
export default userSlice.reducer;
