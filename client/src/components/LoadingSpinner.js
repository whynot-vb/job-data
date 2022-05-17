import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

export default function LoadingSpinner() {
  return (
    <Grid container spacing={0} direction="column" alignItems="center">
      <Stack padding={5} sx={{ color: "grey.500" }} spacing={4} direction="row">
        <CircularProgress size="5rem" />
        <CircularProgress size="5rem" />
        <CircularProgress size="5rem" />
      </Stack>
    </Grid>
  );
}
