import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { HiOutlineCode } from "react-icons/hi";
import { BsArrowRightShort } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import noLogo from "../images/no-logo.png";
import { likeJob, deleteJob } from "../actionCreators/job";
import { PREPARE_TO_UPDATE } from "../constants/actionTypes";

export default function Job() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const job = useSelector(
    (state) => state.jobs.jobs.filter((job) => job._id === id)[0]
  );
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Grid
      container
      spacing={1}
      sx={{ marginTop: "20px", marginBottom: "20px" }}
      direction="column"
      alignItems="center"
    >
      <Typography variant="body1">
        <Button component={Link} to="/" size="large">
          <FaHome /> Go Back &nbsp; <BsFillArrowLeftSquareFill />
        </Button>
        <HiOutlineCode /> Developer Jobs Data <BsArrowRightShort />{" "}
        <span>{job?.jobName}</span>
      </Typography>
      <Card sx={{ minWidth: 275, backgroundColor: "#F0F8FF", width: "80%" }}>
        <CardContent sx={{ marginTop: "10px", position: "relative" }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            {job?.jobName}
          </Typography>
          <Typography variant="h5" component="div">
            {job?.companyName}
          </Typography>
          <br />
          <Box sx={{ position: "absolute", top: 40, right: 40 }}>
            <IconButton
              color="success"
              onClick={() => dispatch(likeJob(job?._id))}
            >
              {!job?.likes?.includes(user?._id) ? <FiHeart /> : <AiFillHeart />}
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 80,
              right: 40,
            }}
          >
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              This job was liked {job?.likes?.length} times
            </Typography>
          </Box>
          <Box sx={{ position: "absolute", top: 120, right: 40 }}>
            <img
              src={job?.companyLogo || noLogo}
              alt="logo"
              style={{ maxWidth: 60 }}
            />
          </Box>
          <br />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <FaMapMarkerAlt /> {job?.jobLocation}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            <AiOutlineClockCircle /> Expires:{" "}
            {new Date(job?.jobExpiresAt)?.toLocaleDateString()}
          </Typography>
          {job?.salary && (
            <Typography variant="body2">
              <RiMoneyEuroCircleLine /> {job?.salary}
            </Typography>
          )}
          <br />
          <ButtonGroup
            variant="contained"
            size="small"
            aria-label="outlined primary button group"
          >
            {job?.technologies?.map((technology) => {
              return (
                <Button
                  key={technology.toString()}
                  style={{ marginRight: "5px" }}
                >
                  {technology}
                </Button>
              );
            })}
          </ButtonGroup>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, backgroundColor: "#F0F8FF", width: "80%" }}>
        <CardContent>
          <Typography variant="h5" color="text.primary" gutterBottom>
            About Us:
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {job?.aboutUs}
          </Typography>
          <br />
          <Typography variant="h5" color="text.primary" gutterBottom>
            Job Description:
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {job?.jobDescription}
          </Typography>
          <br />
          <Typography variant="h5" color="text.primary" gutterBottom>
            Job Responsibilities:
          </Typography>
          {job?.responsibilities?.map((res) => {
            return (
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <BsDot /> {res}
              </Typography>
            );
          })}
          <br />
          <Typography variant="h5" color="text.primary" gutterBottom>
            Job Requirements:
          </Typography>
          {job?.requiredQualifications?.map((req) => {
            return (
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <BsDot /> {req}
              </Typography>
            );
          })}
          {user?._id === job?.creator && (
            <>
              <Button
                component={Link}
                to="/addJob"
                size="medium"
                variant="contained"
                style={{ backgroundColor: "#2FD4AA" }}
                onClick={() =>
                  dispatch({ type: PREPARE_TO_UPDATE, payload: job })
                }
              >
                Update
              </Button>
              <Button
                component={Link}
                to="/"
                size="medium"
                variant="contained"
                style={{ backgroundColor: "#E52E33" }}
                onClick={() => dispatch(deleteJob(job?._id))}
              >
                DELETE
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}
