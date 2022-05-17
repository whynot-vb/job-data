import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { logout } from "../actionCreators/auth";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const user = useSelector((state) => state.users.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    if (user) {
      dispatch(logout());
    } else return;
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" align="center">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            DEVELOPER JOB DATA
          </Typography>
          <div>
            <span>{user ? user.userName : ""}</span> &nbsp;
            <Button
              component={Link}
              to="/auth"
              color="inherit"
              size="large"
              variant="outlined"
              onClick={handleLogout}
            >
              {!user ? "Register/Login" : "Logout"}
            </Button>
          </div>
        </Toolbar>
        <div>
          {user && (
            <Button
              component={Link}
              to="/addJob"
              variant="contained"
              size="large"
            >
              Click here to create a new job
            </Button>
          )}
          {!user && (
            <Typography variant="h5">
              By logging in you can create a new job, update, delete jobs you
              created, or like jobs.
            </Typography>
          )}
        </div>
      </AppBar>
    </Box>
  );
}
