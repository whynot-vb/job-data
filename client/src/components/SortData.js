import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";

import { sortValue } from "../actionCreators/job";

export default function SortData() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.jobs.sort);
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ marginBottom: "20px" }}
    >
      <Box
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="job-label">By job name</InputLabel>
          <Select
            labelId="job-label"
            id="job"
            autoWidth
            label="Sort by job name"
            value={sort}
            onChange={(event) => dispatch(sortValue(event.target.value))}
          >
            <MenuItem value="a-z">A-Z</MenuItem>
            <MenuItem value="z-a">Z-A</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="expiration-date-label">By expiration date</InputLabel>
          <Select
            labelId="expiration-date-label-label"
            id="expiration-date-label"
            label="Expiration date"
            value={sort}
            onChange={(event) => dispatch(sortValue(event.target.value))}
          >
            <MenuItem value="expiresFirst">First expires</MenuItem>
            <MenuItem value="expiresLast">Last expires</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1 }}>
          <InputLabel id="demo-simple-select-helper-label">
            By number of likes
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Age"
            value={sort}
            onChange={(event) => dispatch(sortValue(event.target.value))}
          >
            <MenuItem value="likes">Most likes</MenuItem>
            <MenuItem value="dislikes">Least likes</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: "15px" }}>
          <Button
            onClick={() => dispatch(sortValue("likes"))}
            variant="contained"
            type="submit"
            size="large"
          >
            Default Sort
          </Button>
        </FormControl>
      </Box>
    </Grid>
  );
}
