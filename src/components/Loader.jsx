import { CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
    return (
        <div className="loading">
            <CircularProgress />
        </div>
    );
};

export default Loader;
