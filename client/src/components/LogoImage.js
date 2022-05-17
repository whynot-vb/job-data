import React from "react";
import Paper from "@mui/material/Paper";
import wellDone from "../images/well-done.jpg";

const LogoImage = () => {
  return (
    <Paper style={{ marginBottom: "20px" }}>
      <img src={wellDone} alt="logo" width="100%" />
    </Paper>
  );
};

export default LogoImage;
