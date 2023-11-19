import { Tabs, Tab, Grid, Card, Typography, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { ADD_USER, EDIT_USER, GET_USER_BY_ID } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, user } from "../features/User.reducer";
import { handleToaster } from "../features/Toaster.reducer";
import Loader from "./Loader";

const Main = () => {
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const userInfo = useSelector(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const serviceParticularsRef = React.useRef(null);
    const workInfoRef = React.useRef(null);
    const familyInfoRef = React.useRef(null);
    const photosUploadRef = React.useRef(null);
    const parentBox = React.useRef(null);
    const [formData, setFormData] = useState({});
    const [oldImage, setOldImage] = React.useState(null);
    const [newImage, setNewImage] = React.useState(null);
    var minMax = require("dayjs/plugin/minMax");
    dayjs.extend(minMax);
    const [dob, setdob] = useState(null);
    const [dod, setdod] = useState(null);
    const [dom, setdom] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (userInfo.isLogin) {
            if (location.state) {
                setFormData(location.state);
            } else {
                setIsLoading(true);
                axios.get(GET_USER_BY_ID + "/" + userInfo._id).then((res) => {
                    setIsLoading(false);
                    setFormData(res.data);
                    setOldImage(res.data.oldImage);
                    setNewImage(res.data.newImage);
                    setdob(res.data.dob);
                    setdod(res.data.dod);
                    setdom(res.data.dom);
                });
            }
        }
    }, [userInfo, location.state]);
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    function check(variable) {
        return variable === null || variable === true;
    }
    const [error, setError] = useState({});
    const [isCliked, setIsCliked] = useState(false);
    const errors = {
        serviceNo: null,
        name: null,
        address: null,
        trade: null,
        dob: null,
        dom: null,
        dod: null,
        lastPosting: null,
        phoneNo: null,
        company: null,
        designation: null,
        workPlace: null,
        wifeName: null,
        children: null,
        homeTown: null,
        oldPhoto: null,
        newPhoto: null,
    };
    async function getBase64Image(image) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            var dlImage;
            reader.onload = function () {
                dlImage = reader.result;
                resolve(dlImage);
            };
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    }
    const sectionRefs = [
        { index: 0, ref: serviceParticularsRef, label: "Service Particulars" },
        { index: 1, ref: workInfoRef, label: "Work Info" },
        { index: 2, ref: familyInfoRef, label: "Family Info" },
        { index: 3, ref: photosUploadRef, label: "Photos Upload" },
    ];
    React.useEffect(() => {
        const outerDivRef = parentBox;
        const innerDivRef = serviceParticularsRef;
        if (outerDivRef.current && innerDivRef.current) {
            const outerDiv = outerDivRef.current;
            const innerDiv = innerDivRef.current;
            const scrollTo = innerDiv.offsetTop - outerDiv.offsetTop;
            outerDiv.scrollTop = scrollTo;
        }
    }, []);
    // function checkServiceNo() {
    //     console.log("checking");
    //     if (formData.serviceNo === undefined) return;
    //     const serviceNo = formData.serviceNo;
    //     const pattern = /^688\d{3}$/;
    //     const valid = pattern.test(formData.serviceNo);
    //     if (valid) {
    //         axios
    //             .get(GET_USER + "/" + serviceNo)
    //             .then((res) => {
    //                 const userData = res.data;
    //                 delete userData.serviceNo;
    //                 setFormData(userData);
    //             })
    //             .catch(() => {});
    //     } else {
    //         return;
    //     }
    // }
    React.useEffect(() => {
        validate({});
        // checkServiceNo();
    }, [formData, isCliked]);

    async function handleEdit() {
        setIsCliked(true);
        const data = validate(errors);
        console.log(data);
        const valids = Object.keys(data).map(
            (val) => !(data[val] === null || data[val])
        );
        const isValid = valids.every((value) => value === true);
        if (isValid) {
            formData.dod = dod;
            formData.dob = dob;
            formData.dom = dom;
            if (typeof formData.oldImage !== "string")
                formData.oldImage = await getBase64Image(oldImage);
            if (typeof formData.newImage !== "string")
                formData.newImage = await getBase64Image(newImage);
            setIsLoading(true);
            axios
                .post(EDIT_USER, { ...formData, _id: userInfo._id })
                .then((val) => {
                    setIsLoading(false);
                    dispatch(
                        handleToaster({
                            message: "Successfully edited",
                            severity: "success",
                            open: true,
                        })
                    );
                    setFormData(val.data);
                })
                .catch((err) => {
                    setIsLoading(false);
                    dispatch(
                        handleToaster({
                            message: "Something went wrong",
                            severity: "error",
                            open: true,
                        })
                    );
                });
        }
    }

    function validate(dd) {
        var temp = dd;
        Object.keys(formData).forEach((val) => {
            temp = {
                ...temp,
                [val]:
                    formData[val] !== undefined && formData[val]?.length === 0,
            };
            if (val === "serviceNo") {
                temp = {
                    ...temp,
                    serviceNo:
                        !/^688(196|197|198|199|2[0-9]{2}|3[0-8][0-9]|39[0-6]|095)$/.test(
                            formData?.serviceNo
                        ),
                };
            }
        });
        temp = {
            ...temp,
            dob: dob === null,
            dom: dom === null,
            dod: dod === null,
            oldPhoto: oldImage === null,
            newPhoto: newImage === null,
        };
        setError({ ...error, ...temp });
        return { ...error, ...temp };
    }
    const handleTabChange = (event, newValue) => {
        const section = sectionRefs.find((val) => val.index === newValue);
        if (parentBox.current && section.ref.current) {
            const innerDiv = section.ref.current;

            innerDiv.scrollIntoView({
                behavior: "smooth",
                block: "start",
                top: 34,
            });
        }

        setValue(newValue);
    };
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }
    async function handleSubmit() {
        setIsCliked(true);
        const data = validate(errors);
        const valids = Object.keys(data).map(
            (val) => !(data[val] === null || data[val])
        );
        const isValid = valids.every((value) => value === true);
        if (isValid) {
            formData.dod = dod;
            formData.dob = dob;
            formData.dom = dom;
            formData.oldImage = await getBase64Image(oldImage);
            formData.newImage = await getBase64Image(newImage);
            setIsLoading(true);
            axios
                .post(ADD_USER, formData)
                .then((val) => {
                    setIsLoading(false);
                    const userData = val.data;
                    dispatch(
                        handleToaster({
                            message: "Submitted Successfully",
                            severity: "error",
                            open: true,
                        })
                    );
                    dispatch(
                        handleLogin({
                            isLogin: true,
                            _id: userData._id,
                        })
                    );
                    navigate("/profile", { state: { ...userData } });
                })
                .catch((err) => {
                    setIsLoading(false);
                    dispatch(
                        handleToaster({
                            message: "Something wetn wrong",
                            severity: "error",
                            open: true,
                        })
                    );
                });
        }
    }
    // const handleScroll = () => {
    //     const sectionPositions = sectionRefs.map((sectionRef) => ({
    //         index: sectionRef.index,
    //         offsetTop: sectionRef.ref.current.offsetTop,
    //     }));

    //     // Determine which section is in view based on the scroll position
    //     const scrollPosition = parentBox.current.scrollTop;
    //     for (let i = sectionPositions.length - 1; i >= 0; i--) {
    //         if (scrollPosition >= sectionPositions[i].offsetTop) {
    //             setActiveSection(sectionPositions[i].index);
    //             break;
    //         }
    //     }
    // };

    // useEffect(() => {
    //     // Add a scroll event listener to the parent container
    //     const outerDivRef = parentBox;
    //     if (outerDivRef.current) {
    //         outerDivRef.current.addEventListener("scroll", handleScroll);
    //     }

    //     return () => {
    //         // Remove the event listener when the component unmounts
    //         if (outerDivRef.current) {
    //             outerDivRef.current.removeEventListener("scroll", handleScroll);
    //         }
    //     };
    // }, []); // This effect runs only once
    // const [activeSection, setActiveSection] = useState(0);
    // ... (other code remains the same)

    // Update the active tab based on the active section
    // const handleTabChange = (event, newValue) => {
    //     const section = sectionRefs.find((val) => val.index === newValue);
    //     if (parentBox.current && section.ref.current) {
    //         const innerDiv = section.ref.current;
    //         innerDiv.scrollIntoView({
    //             behavior: "smooth",
    //             block: "start",
    //             top: 34,
    //         });
    //     }

    //     setActiveSection(newValue);
    // };

    // React.useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) {
    //                 console.log("Inner div is visible", entry);
    //                 return true;
    //             } else {
    //                 console.log("Inner div is not visible", entry);
    //                 return false;
    //             }
    //         },
    //         {
    //             root: null,
    //             rootMargin: "0px",
    //             threshold: 1.0,
    //         }
    //     );

    //     // if (workInfoRef.current) {
    //     //     observer.observe(workInfoRef.current);
    //     // }
    //     for (let i = 0; i < sectionRefs.length; i++) {
    //         const section = sectionRefs[i];
    //         if (section.ref.current && observer.observe(section.ref.current)) {
    //             console.log("there");
    //             setValue(section.index);
    //             break;
    //         }
    //     }
    //     // sectionRefs.forEach((section) => {
    //     //     if (section.ref.current && observer.observe(section.ref.current)) {
    //     //         console.log("there");
    //     //         setValue(section.index);

    //     //     }
    //     // });

    //     return () => {
    //         // if (workInfoRef.current) {
    //         //     observer.unobserve(workInfoRef.current);
    //         // }
    //         sectionRefs.forEach((section) => {
    //             if (section.ref.current) {
    //                 observer.unobserve(section.ref.current);
    //             }
    //         });
    //     };
    // }, []);

    return (
        <Box width="100%">
            {isLoading && <Loader />}
            <Box width="100%" mt={2} display="flex" justifyContent="center">
                <Grid
                    container
                    sx={{ width: { xs: "100%", md: "100%", lg: "70%" } }}
                    mx="auto"
                    mt={2}
                    height="90px"
                >
                    <Grid
                        item
                        xs="none"
                        md={3}
                        sx={{ marginX: { xs: "auto" } }}
                    >
                        <Card elevation={2} sx={{ display: "inline-block" }}>
                            <img
                                src={formData?.newImage}
                                width="200px"
                                height="200px"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={9} display="inline-block">
                        <Card sx={{ m: 1 }}>
                            <Tabs
                                value={value}
                                onChange={handleTabChange}
                                aria-label="basic tabs example"
                                sx={{
                                    width: "100%",
                                    px: 2,
                                    display: { xs: "none", md: "block" },
                                }}
                            >
                                {sectionRefs.map((section, index) => (
                                    <Tab
                                        key={index}
                                        label={section.label}
                                        onClick={() => {
                                            setValue(index);
                                        }}
                                        {...a11yProps(index)}
                                    />
                                ))}
                            </Tabs>

                            <Box
                                height="77vh"
                                overflow="auto"
                                ref={parentBox}
                                m={1}
                                p={1}
                            >
                                <Box
                                    sx={{ height: { xs: "100vh", sm: "60vh" } }}
                                >
                                    <Typography
                                        variant="h5"
                                        align="left"
                                        fontWeight="10px"
                                        ref={serviceParticularsRef}
                                    >
                                        Service Particulars
                                    </Typography>
                                    <Box
                                        sx={{
                                            "& .MuiTextField-root": {
                                                m: 1,
                                                width: "100%",
                                            },
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.serviceNo
                                                            ? formData.serviceNo
                                                            : ""
                                                    }
                                                    disabled={userInfo.isLogin}
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Service No"
                                                    variant="filled"
                                                    name="serviceNo"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.serviceNo)
                                                            ? "enter valid service no"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.serviceNo
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.name
                                                            ? formData.name
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    label="Name"
                                                    variant="filled"
                                                    name="name"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.name)
                                                            ? "enter valid name"
                                                            : ""
                                                    }
                                                    error={check(error.name)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.trade
                                                            ? formData.trade
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Trade"
                                                    variant="filled"
                                                    name="trade"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.trade)
                                                            ? "enter valid trade"
                                                            : ""
                                                    }
                                                    error={check(error.trade)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={
                                                        formData?.dob &&
                                                        dayjs(
                                                            new Date(
                                                                formData?.dob
                                                            )
                                                        )
                                                    }
                                                    required
                                                    slotProps={{
                                                        textField: {
                                                            helperText: check(
                                                                error.dob
                                                            )
                                                                ? "enter valid DOB"
                                                                : "",
                                                        },
                                                    }}
                                                    error={check(error.dob)}
                                                    fullWidth
                                                    type="date"
                                                    id="filled-basic"
                                                    label="DOB"
                                                    name="dob"
                                                    onChange={(e) =>
                                                        setdob(
                                                            dayjs(e).format(
                                                                "YYYY-MM-DD"
                                                            )
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={
                                                        formData?.dod &&
                                                        dayjs(
                                                            new Date(
                                                                formData?.dod
                                                            )
                                                        )
                                                    }
                                                    slotProps={{
                                                        textField: {
                                                            helperText: check(
                                                                error.dod
                                                            )
                                                                ? "enter valid DOD"
                                                                : "",
                                                        },
                                                    }}
                                                    fullWidth
                                                    type="date"
                                                    id="filled-basic"
                                                    label="DOD"
                                                    name="dod"
                                                    onChange={(e) =>
                                                        setdod(
                                                            dayjs(e).format(
                                                                "YYYY-MM-DD"
                                                            )
                                                        )
                                                    }
                                                    error={check(error.dod)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.lastPosting
                                                            ? formData.lastPosting
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Last posting"
                                                    variant="filled"
                                                    name="lastPosting"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.lastPosting)
                                                            ? "Enter valid last posting"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.lastPosting
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.phoneNo
                                                            ? formData.phoneNo
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Phone Number"
                                                    variant="filled"
                                                    name="phoneNo"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.phoneNo)
                                                            ? "enter valid Phone number"
                                                            : ""
                                                    }
                                                    error={check(error.phoneNo)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.password
                                                            ? formData.password
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Password"
                                                    variant="filled"
                                                    name="password"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.password)
                                                            ? "enter valid Password"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.password
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box sx={{marginTop:{xs:'65px',sm:'0px'}}} >
                                    <Typography
                                        variant="h5"
                                        align="left"
                                        fontWeight="10px"
                                        ref={workInfoRef}
                                    >
                                        Work Info
                                    </Typography>
                                    <Box
                                        sx={{
                                            "& .MuiTextField-root": {
                                                m: 1,
                                                width: "100%",
                                            },
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.company
                                                            ? formData.company
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Company / Organization"
                                                    variant="filled"
                                                    name="company"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.company)
                                                            ? "Enter valid last posting"
                                                            : ""
                                                    }
                                                    error={check(error.company)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    value={
                                                        formData.designation
                                                            ? formData.designation
                                                            : ""
                                                    }
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Designation"
                                                    variant="filled"
                                                    name="designation"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.designation)
                                                            ? "Enter valid designation"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.designation
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.workPlace
                                                            ? formData.workPlace
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Place of work"
                                                    variant="filled"
                                                    name="workPlace"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.workPlace)
                                                            ? "Enter valid work place"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.workPlace
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box height="60vh">
                                    <Typography
                                        variant="h5"
                                        align="left"
                                        fontWeight="10px"
                                        ref={familyInfoRef}
                                        id="testing"
                                    >
                                        Family Info
                                    </Typography>
                                    <Box
                                        sx={{
                                            "& .MuiTextField-root": {
                                                m: 1,
                                                width: "100%",
                                            },
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    value={
                                                        formData.wifeName
                                                            ? formData.wifeName
                                                            : ""
                                                    }
                                                    required
                                                    id="filled-basic"
                                                    label="Wife name"
                                                    variant="filled"
                                                    type="text"
                                                    name="wifeName"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.wifeName)
                                                            ? "Enter valid wife name"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.wifeName
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <DatePicker
                                                    format="DD/MM/YYYY"
                                                    value={
                                                        formData?.dom &&
                                                        dayjs(
                                                            new Date(
                                                                formData?.dom
                                                            )
                                                        )
                                                    }
                                                    fullWidth
                                                    type="date"
                                                    id="filled-basic"
                                                    label="Date of marraige"
                                                    slotProps={{
                                                        textField: {
                                                            helperText: check(
                                                                error.dom
                                                            )
                                                                ? "Enter valid DOM"
                                                                : "",
                                                        },
                                                    }}
                                                    name="dom"
                                                    onChange={(e) =>
                                                        setdom(
                                                            dayjs(e).format(
                                                                "YYYY-MM-DD"
                                                            )
                                                        )
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.children
                                                            ? formData.children
                                                            : ""
                                                    }
                                                    required
                                                    fullWidth
                                                    id="filled-basic"
                                                    label="Children"
                                                    variant="filled"
                                                    type="number"
                                                    name="children"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.children)
                                                            ? "Enter a valid children"
                                                            : ""
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    value={
                                                        formData.homeTown
                                                            ? formData.homeTown
                                                            : ""
                                                    }
                                                    fullWidth
                                                    required
                                                    id="filled-basic"
                                                    label="Home Town"
                                                    variant="filled"
                                                    type="text"
                                                    name="homeTown"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.homeTown)
                                                            ? "Enter a valid home town"
                                                            : ""
                                                    }
                                                    error={check(
                                                        error.homeTown
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    value={
                                                        formData.address
                                                            ? formData.address
                                                            : ""
                                                    }
                                                    fullWidth
                                                    required
                                                    id="filled-basic"
                                                    variant="filled"
                                                    multiline
                                                    rows={2}
                                                    label="Address"
                                                    name="address"
                                                    onChange={handleChange}
                                                    helperText={
                                                        check(error.address)
                                                            ? "Enter a valid address"
                                                            : ""
                                                    }
                                                    error={check(error.address)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <Box ref={photosUploadRef} p={2} sx={{marginTop:{xs:'65px',sm:'0px'}}}>
                                    <Typography
                                        variant="h5"
                                        align="left"
                                        fontWeight="10px"
                                        ref={photosUploadRef}
                                    >
                                        Photos Upload
                                    </Typography>
                                    <Box
                                        sx={{
                                            "& .MuiTextField-root": {
                                                m: 1,
                                                width: "100%",
                                            },
                                        }}
                                    >
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <Typography>
                                                    Old Photo (1988)
                                                </Typography>
                                                <Upload
                                                    accept="image/*"
                                                    maxCount={1}
                                                    getValueFromEvent={normFile}
                                                    listType="picture"
                                                    beforeUpload={(file) => {
                                                        setOldImage(file);
                                                        return false;
                                                    }}
                                                    style={{
                                                        maxWidth: 20,
                                                        minHeight: 40,
                                                    }}
                                                    onRemove={() =>
                                                        setOldImage(null)
                                                    }
                                                >
                                                    <Button
                                                        icon={
                                                            <UploadOutlined />
                                                        }
                                                    >
                                                        upload
                                                    </Button>
                                                </Upload>
                                                {check(error.oldPhoto) && (
                                                    <Typography>
                                                        please upload a photo
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography>
                                                    Latest Photo
                                                </Typography>
                                                <Upload
                                                    accept="image/*"
                                                    maxCount={1}
                                                    getValueFromEvent={normFile}
                                                    listType="picture"
                                                    beforeUpload={async (
                                                        file
                                                    ) => {
                                                        setNewImage(file);
                                                        const b64 =
                                                            await getBase64Image(
                                                                file
                                                            );
                                                        setFormData({
                                                            ...formData,
                                                            newImage: b64,
                                                        });
                                                        return false;
                                                    }}
                                                    style={{
                                                        maxWidth: 20,
                                                        minHeight: 40,
                                                    }}
                                                    onRemove={() =>
                                                        setNewImage(null)
                                                    }
                                                >
                                                    <Button
                                                        icon={
                                                            <UploadOutlined />
                                                        }
                                                    >
                                                        upload
                                                    </Button>
                                                </Upload>
                                                {check(error.newPhoto) && (
                                                    <Typography>
                                                        please upload a photo
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={12}
                                                alignContent="center"
                                                alignItems="center"
                                                textAlign="center"
                                            >
                                                {userInfo.isLogin ? (
                                                    <Button
                                                        style={{ marginTop: 4 }}
                                                        onClick={handleEdit}
                                                    >
                                                        Edit
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        style={{ marginTop: 4 }}
                                                        onClick={handleSubmit}
                                                    >
                                                        Submit
                                                    </Button>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Main;
