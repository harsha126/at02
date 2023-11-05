import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./Toaster.reducer";
import UserReducer from "./User.reducer";

const store = configureStore({
    name: "main",
    reducer: {
        toaster: toastReducer,
        user: UserReducer,
    },
});

export default store;
