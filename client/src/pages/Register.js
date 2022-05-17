import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { FaHome } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useHistory, Link } from "react-router-dom";

import { displayAlert } from "../actionCreators/job";
import { register, login } from "../actionCreators/auth";
import AlertToDisplay from "../components/AlertToDisplay";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.jobs.showAlert);

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    location: "",
    isMember: false,
  });

  const clearValues = () => {
    setUserData({
      userName: "",
      email: "",
      password: "",
      location: "",
    });
  };

  const toggleMember = () => {
    setUserData({ ...userData, isMember: !userData.isMember });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userName, email, password, location, isMember } = userData;
    if (!email || !password || (!isMember && !userName)) {
      dispatch(
        displayAlert("error", "You have to provide all required values")
      );
    }
    const currentUser = { userName, location, email, password };
    if (!isMember) {
      dispatch(register(currentUser, history));
    } else {
      dispatch(login(currentUser, history));
    }
    clearValues();
  };

  useEffect(() => {});

  return (
    <Paper variant="outlined" align="center">
      {showAlert && <AlertToDisplay />}
      <Paper
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          width: "40%",
          marginTop: "20px",
          marginBottom: "20px",
          overflow: "hidden",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Button component={Link} to="/" size="large">
          <FaHome /> Go Back &nbsp; <BsFillArrowLeftSquareFill />
        </Button>
        <Typography variant="h6">
          {userData.isMember ? "Login" : "Register"}
        </Typography>
        {!userData.isMember && (
          <TextField
            required
            id="outlined-required"
            label="Username"
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleChange}
          />
        )}
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        {!userData.isMember && (
          <TextField
            id="outlined"
            label="Location"
            type="location"
            name="location"
            value={userData.location}
            onChange={handleChange}
          />
        )}
        <TextField
          required
          id="outlined-required"
          label="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ width: "52ch", marginBottom: "10px" }}
        >
          Submit
        </Button>
        <Typography variant="body1">
          {userData.isMember ? "Not a member jet?" : "Already a member?"}
          <Button size="small" onClick={toggleMember}>
            {userData.isMember ? "Register" : "Login"}
          </Button>
        </Typography>
      </Paper>
    </Paper>
  );
};

export default Register;
