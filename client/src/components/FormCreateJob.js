import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileBase from "react-file-base64";
import { FaHome } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useHistory, Link } from "react-router-dom";

import AlertToDisplay from "./AlertToDisplay";
import { displayAlert, createJob, updateJob } from "../actionCreators/job";

const FormCreateJob = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const job = useSelector((state) => state.jobs.job);
  const showAlert = useSelector((state) => state.jobs.showAlert);
  const isUpdating = useSelector((state) => state.jobs.isUpdating);
  const [jobData, setJobData] = useState({
    jobName: "",
    companyName: "",
    jobLocation: "",
    salary: "",
    technologies: [],
    jobExpiresAt: null,
    companyLogo: "",
    aboutUs: "",
    jobDescription: "",
    responsibilities: [],
    requiredQualifications: [],
  });

  const clearValues = () => {
    setJobData({
      jobName: "",
      companyName: "",
      jobLocation: "",
      salary: "",
      technologies: [],
      jobExpiresAt: null,
      companyLogo: "",
      aboutUs: "",
      jobDescription: "",
      responsibilities: [],
      requiredQualifications: [],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !jobData.jobName ||
      !jobData.companyName ||
      !jobData.jobLocation ||
      !jobData.aboutUs ||
      !jobData.jobDescription ||
      !jobData.responsibilities ||
      !jobData.requiredQualifications
    ) {
      dispatch(
        displayAlert("error", "You must provide all the required values")
      );
    }

    if (!isUpdating) {
      dispatch(createJob({ ...jobData, creator: user?._id }, history));
    } else if (isUpdating) {
      dispatch(updateJob(job?._id, { ...jobData }, history));
    }
    clearValues();
  };

  const handleClear = () => {
    clearValues();
  };

  useEffect(() => {
    if (isUpdating && job) {
      setJobData(job);
    }
  }, [job, isUpdating]);

  return (
    <Paper variant="outlined" align="center">
      {showAlert && <AlertToDisplay />}
      <Paper
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          width: "80%",
          marginTop: "20px",
          marginBottom: "20px",
          overflow: "hidden",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          <Button component={Link} to="/" size="large">
            <FaHome /> Go Back &nbsp; <BsFillArrowLeftSquareFill />
          </Button>
          Creating a new job
        </Typography>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Job Name"
            type="text"
            name="jobName"
            value={jobData.jobName}
            onChange={(e) =>
              setJobData({ ...jobData, jobName: e.target.value })
            }
          />
          <TextField
            required
            id="outlined-required"
            label="Company Name"
            type="text"
            name="companyName"
            value={jobData.companyName}
            onChange={(e) =>
              setJobData({ ...jobData, companyName: e.target.value })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Job Location"
            type="text"
            name="jobLocation"
            value={jobData.jobLocation}
            onChange={(e) =>
              setJobData({ ...jobData, jobLocation: e.target.value })
            }
          />
          <TextField
            id="outlined"
            label="Salary"
            type="text"
            name="salary"
            value={jobData.salary}
            onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
          />
        </div>
        <div>
          <TextField
            required
            label="Technologies(separate by ,)"
            id="fullWidth"
            name="technologies"
            type="text"
            value={jobData.technologies}
            onChange={(e) =>
              setJobData({
                ...jobData,
                technologies: e.target.value.split(","),
              })
            }
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date when job expires"
              name="jobExpiresAt"
              value={jobData.jobExpiresAt}
              onChange={(newValue) =>
                setJobData({ ...jobData, jobExpiresAt: newValue })
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            placeholder="Enter information about your company"
            style={{ width: "102ch" }}
            name="aboutUs"
            value={jobData.aboutUs}
            onChange={(e) =>
              setJobData({
                ...jobData,
                aboutUs: e.target.value,
              })
            }
          />
        </div>
        <div>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            placeholder="Enter information about the job"
            style={{ width: "102ch" }}
            name="jobDescription"
            value={jobData.jobDescription}
            onChange={(e) =>
              setJobData({
                ...jobData,
                jobDescription: e.target.value,
              })
            }
          />
        </div>
        <div>
          <TextField
            required
            style={{ width: "102ch" }}
            label="Job responsibilities (separate by ,)"
            id="fullWidth"
            name="responsibilities"
            type="text"
            value={jobData.responsibilities}
            onChange={(e) =>
              setJobData({
                ...jobData,
                responsibilities: e.target.value.split(","),
              })
            }
          />
        </div>
        <div>
          <TextField
            required
            style={{ width: "102ch" }}
            label="Required Qualifications (separate by ,)"
            id="fullWidth"
            name="requiredQualifications"
            type="text"
            value={jobData.requiredQualifications}
            onChange={(e) =>
              setJobData({
                ...jobData,
                requiredQualifications: e.target.value.split(","),
              })
            }
          />
        </div>
        <div>
          <Typography variant="body1">Company Logo</Typography>
          <FileBase
            type="file"
            label="Logo"
            multiple={false}
            onDone={({ base64 }) =>
              setJobData({ ...jobData, companyLogo: base64 })
            }
          />
        </div>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            style={{ width: "52ch", marginRight: "10px" }}
          >
            {isUpdating ? "Update job" : "Submit"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: "52ch", marginLeft: "10px" }}
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </Paper>
    </Paper>
  );
};

export default FormCreateJob;
