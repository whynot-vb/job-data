import * as api from "../api";
import {
  GET_JOBS_OK,
  GET_JOBS_FAILED,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  WAITING_TO_FETCH,
  CREATE_JOB_OK,
  CREATE_JOB_FAILED,
  UPDATE_JOB_OK,
  UPDATE_JOB_FAILED,
  LIKE_JOB,
  GET_ONE_JOB_OK,
  GET_ONE_JOB_FAILED,
  DELETE_JOB_OK,
  SORT_VALUE,
} from "../constants/actionTypes";

export const displayAlert = (alertType, alertText) => async (dispatch) => {
  dispatch({ type: DISPLAY_ALERT, payload: { alertType, alertText } });
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT });
  }, 3000);
};

export const getJobs = () => async (dispatch, getState) => {
  dispatch({ type: WAITING_TO_FETCH });
  const { jobName, companyName, jobLocation, technologies, sort, page, limit } =
    getState().jobs;

  try {
    const { data } = await api.fetchJobs(
      jobName,
      companyName,
      jobLocation,
      technologies,
      sort,
      page,
      limit
    );

    dispatch({
      type: GET_JOBS_OK,
      payload: {
        jobs: data.results,
        totalJobs: data.numberOfResults,
        numOfPages: data.numberOfPages,
      },
    });
    dispatch(displayAlert("success", "Jobs successfully loaded."));
  } catch (err) {
    dispatch({ type: GET_JOBS_FAILED });
    dispatch(displayAlert("error", "Failed to get jobs from the server"));
  }
};

export const getOneJob = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchOneJob(id);
    dispatch({ type: GET_ONE_JOB_OK, payload: data });
  } catch (error) {
    dispatch({ type: GET_ONE_JOB_FAILED });
    dispatch(displayAlert("error", "Failed to get job you wanted"));
  }
};

export const updateJob = (id, updatedJob, history) => async (dispatch) => {
  dispatch({ type: WAITING_TO_FETCH });
  try {
    const { data } = await api.updateJob(id, updatedJob);
    dispatch({ type: UPDATE_JOB_OK, payload: data });
    dispatch(
      displayAlert(
        "success",
        "You just updated your job. Rerouting to the home page."
      )
    );
    setTimeout(() => history.push("/"), 3000);
  } catch (error) {
    dispatch({ type: UPDATE_JOB_FAILED });
    dispatch(
      displayAlert("error", "Unable to update job. Please try again later")
    );
  }
};

export const likeJob = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeJob(id);
    dispatch({
      type: LIKE_JOB,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: UPDATE_JOB_FAILED });
    dispatch(
      displayAlert(
        "error",
        "Unable to add your like to the job. Please try again later"
      )
    );
  }
};

export const createJob = (job, history) => async (dispatch) => {
  dispatch({ type: WAITING_TO_FETCH });

  try {
    const { data } = await api.createJob(job);
    dispatch({ type: CREATE_JOB_OK, payload: data });
    dispatch(
      displayAlert(
        "success",
        "You just created a new job. Rerouting to the home page."
      )
    );
    setTimeout(() => history.push("/"), 3000);
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(displayAlert("error", "You must be logged in to create a job"));
      return;
    }
    dispatch({ type: CREATE_JOB_FAILED });
    dispatch(
      displayAlert(
        "error",
        "You failed to create a new job. Please fill all the required fields"
      )
    );
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    await api.deleteJob(id);
    dispatch({ type: DELETE_JOB_OK, payload: id });
    dispatch(
      displayAlert(
        "success",
        "You delete job successfully. Rerouting to the home page."
      )
    );
  } catch (error) {
    dispatch(displayAlert("error", "You failed to delete job"));
  }
};

export const sortValue = (value) => async (dispatch) => {
  try {
    dispatch({ type: SORT_VALUE, payload: value });
  } catch (error) {
    dispatch(displayAlert("error", "You failed to enter sort values "));
  }
};
