import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { CHANGE_FILTERS, CHANGE_PAGE } from "../constants/actionTypes";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { BiReset } from "react-icons/bi";
import "../index.css";

export default function FilterFormData() {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({
    jobName: "",
    companyName: "",
    jobLocation: "",
    technologies: "",
  });

  const handleChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { jobName, companyName, jobLocation, technologies } = filterData;
    dispatch({
      type: CHANGE_FILTERS,
      payload: {
        jobName,
        companyName,
        jobLocation,
        technologies,
      },
    });
    dispatch({ type: CHANGE_PAGE, payload: 1 });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ marginBottom: "20px" }}
    >
      <Grid item xs={3}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "22ch" },
          }}
          noValidate
          autoComplete="on"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Job Name"
            variant="outlined"
            name="jobName"
            value={filterData.jobName}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
            name="companyName"
            value={filterData.companyName}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Job Location"
            variant="outlined"
            name="jobLocation"
            value={filterData.jobLocation}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Technology"
            variant="outlined"
            name="technologies"
            value={filterData.technologies}
            onChange={handleChange}
          />
          <FormControl fullWidth style={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              type="submit"
              size="large"
              endIcon={<SendIcon />}
            >
              Search
            </Button>
          </FormControl>
          <FormControl fullWidth style={{ marginTop: "15px" }}>
            <Button
              variant="contained"
              type="button"
              size="large"
              onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
              endIcon={<BiReset />}
            >
              Reset Filters
            </Button>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
