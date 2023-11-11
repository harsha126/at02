import {
    Box,
    Divider,
    IconButton,
    ImageList,
    ImageListItem,
    Menu,
    MenuItem,
    Paper,
    Typography,
} from "@mui/material";
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ImageBox = ({ title, images }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box
          
        >
            <Box
                sx={{
                    width: "fit-content",
                    p: 1,
                    m: 2,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="title">{title}</Typography>
                    <IconButton
                        onClick={handleClick}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <MoreHorizIcon />
                        <Menu
                            id="basic-menu"
                            anchorEl={() => anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                Drive link
                            </MenuItem>
                        </Menu>
                    </IconButton>
                </Box>
                <Divider variant="fullWidth" />
                <ImageList sx={{ width: 900 }} cols={6} rowHeight={85} gap={6}>
                    <ImageListItem>
                        <img src="https://picsum.photos/200" height="200" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="https://picsum.photos/200" height="200" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="https://picsum.photos/200" height="200" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="https://picsum.photos/200" height="200" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="https://picsum.photos/200" height="200" />
                    </ImageListItem>
                    <ImageListItem>
                        <img src="https://picsum.photos/200" height="200" />
                    </ImageListItem>
                    <ImageListItem></ImageListItem>
                </ImageList>
            </Box>
        </Box>
    );
};

export default ImageBox;
