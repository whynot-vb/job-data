import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { CHANGE_PAGE } from "../constants/actionTypes";

export default function PaginationComponent() {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.jobs.page);
  const handleChange = (event, value) => {
    dispatch({ type: CHANGE_PAGE, payload: value });
  };
  return (
    <Grid
      container
      style={{ marginTop: "20px", marginBottom: "20px" }}
      spacing={1}
      direction="column"
      alignItems="center"
    >
      <Stack spacing={2}>
        <Pagination
          count={10}
          page={page}
          variant="outlined"
          color="primary"
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </Grid>
  );
}
