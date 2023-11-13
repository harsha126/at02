import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import ImageBox from "./ImageBox";
import styled from "styled-components";
import { driveLinks } from "../data/driveLinks";
import { useParams } from "react-router-dom";
import { reunionMappings } from "../data/reunion";
function findKeyByValue(object, value) {
    for (const key in object) {
        if (object[key] === value) {
            return key;
        }
    }
    return null;
}
const LandingPage = () => {
    const { id } = useParams();
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
    const scrollingElementRef = useRef(null);
    useEffect(() => {
        if (scrollingElementRef.current) {
            const imageBoxToScroll = scrollingElementRef.current.querySelector(
                `[data-id="${reunionMappings[id]}"]`
            );
            if (imageBoxToScroll) {
                imageBoxToScroll.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [id]);
    return (
        <Box>
            <Box
                width="100%"
                height="20%"
                display="flex"
                justifyContent="center"
                fontWeight="bold"
            >
                <Typography
                    variant="title"
                    sx={{
                        fontSize: { xs: "50px", md: "100px" },
                    }}
                >
                    REUNION
                </Typography>
            </Box>
            <MyScrollingElement
                ref={scrollingElementRef}
                sx={{
                    maxHeight: "500px",
                    marginX: "auto",
                    backdropFilter: "blur(5px)",
                    backgroundColor: "transparent",
                    width: "fit-content",
                }}
            >
                {driveLinks.map((drive) => (
                    <ImageBox
                        title={drive.name}
                        key={drive.name}
                        link={drive.link}
                        image={findKeyByValue(reunionMappings, drive.name)}
                    />
                ))}
            </MyScrollingElement>
        </Box>
    );
};

export default LandingPage;
