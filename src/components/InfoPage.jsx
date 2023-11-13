import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import pdf1 from "./../assets/SparshGuidanceCircular.pdf";
import pdf2 from "./../assets/93d865c1-18a6-495d-9b11-01b68c371131.pdf";

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
                    <li>
                        Sparsh information :
                        <a href={pdf1} target="_blank">
                            more ...
                        </a>
                    </li>
                    <li>
                        Sparsh Portal : &nbsp 
                        <a href={pdf2} target="_blank">
                            more ...
                        </a>
                    </li>
                </ul>
            </Paper>
        </Box>
    );
};

export default InfoPage;
