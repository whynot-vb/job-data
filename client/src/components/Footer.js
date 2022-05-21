import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ marginBottom: "20px" }}
    >
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        All the data in this application is mock data. Although some companies
        are real, jobs are not. This is made for portfolio purposes only
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <AiOutlineCopyrightCircle /> made by{" "}
        <a href="https://github.com/whynot-vb">why-not</a>
      </Typography>
    </Grid>
  );
};

export default Footer;
