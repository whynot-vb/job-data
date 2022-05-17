import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import { FaDev, FaMapMarkerAlt } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import noLogo from "../images/no-logo.png";
import { getOneJob, likeJob, deleteJob } from "../actionCreators/job";
import { PREPARE_TO_UPDATE } from "../constants/actionTypes";

export default function CardContainer() {
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  return (
    <Grid
      container
      spacing={1}
      sx={{ marginTop: "20px" }}
      direction="column"
      alignItems="center"
    >
      {jobs.map((job) => {
        return (
          <Card
            sx={{
              minWidth: 275,
              backgroundColor: "#F0F8FF",
              width: "80%",
              marginTop: "20px",
            }}
          >
            <Typography variant="h6">
              <FaDev /> New
            </Typography>
            <CardContent sx={{ position: "relative" }}>
              <Typography variant="h5" color="text.primary" gutterBottom>
                {job.jobName}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="div">
                {job.companyName}
              </Typography>
              <br />
              <Box sx={{ position: "absolute", top: 40, right: 40 }}>
                <IconButton
                  color="success"
                  onClick={() => dispatch(likeJob(job._id))}
                >
                  {!job.likes.includes(user?._id) ? (
                    <FiHeart />
                  ) : (
                    <AiFillHeart />
                  )}
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
                  This job was liked {job.likes.length} times
                </Typography>
              </Box>
              <Box sx={{ position: "absolute", top: 120, right: 40 }}>
                <img
                  src={job?.companyLogo || noLogo}
                  alt="logo"
                  style={{ maxWidth: 60 }}
                />
              </Box>
              <Typography sx={{ mb: 1.5, width: "80%" }} color="text.secondary">
                {job.jobDescription.split(".")[0]}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <FaMapMarkerAlt /> {job.jobLocation}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <AiOutlineClockCircle /> Expires:{" "}
                {new Date(job.jobExpiresAt).toLocaleDateString()}
              </Typography>
              {job.salary && (
                <Typography variant="body2">
                  <RiMoneyEuroCircleLine /> {job.salary}
                </Typography>
              )}
              <br />
              <ButtonGroup
                variant="contained"
                size="small"
                aria-label="outlined primary button group"
              >
                {job.technologies.map((technology) => {
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
            <CardActions>
              <Button
                component={Link}
                to={`/job/${job._id}`}
                size="small"
                onClick={() => {
                  console.log(user?._id);
                  console.log(job.creator);
                  dispatch(getOneJob(job._id));
                }}
              >
                Learn More
              </Button>
              {user?._id === job.creator && (
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
                    UPDATE
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    style={{ backgroundColor: "#E52E33" }}
                    onClick={() => dispatch(deleteJob(job._id))}
                  >
                    DELETE
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        );
      })}
    </Grid>
  );
}
