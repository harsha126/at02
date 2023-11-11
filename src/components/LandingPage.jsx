import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ImageBox from "./ImageBox";
import styled from "styled-components";
const LandingPage = () => {
    const MyScrollingElement = styled(Paper)(() => ({
        overflow: "auto",
        color: "rgba(255,255,255,0.2)",
        backdropFilter: "blur(10px)",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none",
        },
        "&-ms-overflow-style:": {
            display: "none",
        },
    }));
    return (
        <Box>
            <Box
                width="100%"
                height="20%"
                display="flex"
                justifyContent="center"
                fontWeight="bold"
            >
                <Typography variant="title" fontSize="100px">
                    AT02
                </Typography>
            </Box>
            <MyScrollingElement
                sx={{
                    maxHeight: "450px",
                    marginX: { md: "160px", sm: "120px", xs: "60px" },
                    // color: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(5px)",
                    backgroundColor:'transparent',
                    width:'fit-content'
                }}
            >
                <ImageBox title="Reunion 1" />
                <ImageBox title="Reunion 2" />
                <ImageBox title="Reunion 3" />
                <ImageBox title="Reunion 1" />
                <ImageBox title="Reunion 2" />
                <ImageBox title="Reunion 3" />
            </MyScrollingElement>
        </Box>
    );
};

export default LandingPage;
