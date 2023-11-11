import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const InfoPage = () => {
    return (
        <Box padding="20px 100px 0px 100px">
            <Paper
                sx={{
                    p: 3,
                    height: "80vh",
                    overflow: "scroll",
                }}
            >
                <Typography
                    variant="title"
                    component="div"
                    textAlign="center"
                    marginLeft="auto"
                    marginRight="auto"
                    fontSize="50px"
                    marginBottom="16px"
                >
                    UseFull Info
                </Typography>

                <ul>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ul>
            </Paper>
        </Box>
    );
};

export default InfoPage;
