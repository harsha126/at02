import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import ImageBox from "./ImageBox";
import styled from "styled-components";
import { driveLinks } from "../data/driveLinks";
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
                    marginX: 'auto',
                    backdropFilter: "blur(5px)",
                    backgroundColor:'transparent',
                    width:'fit-content'
                }}
            >
               {
                driveLinks.map(drive=>(
                    <ImageBox title={drive.name} key={drive.name} link={drive.link}/>
                ))
               }
            </MyScrollingElement>
        </Box>
    );
};

export default LandingPage;
