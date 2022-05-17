import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  WAITING_TO_FETCH,
  LIKE_JOB,
  CLEAR_VALUES,
  SORT_VALUE,
  CREATE_JOB_OK,
  CREATE_JOB_FAILED,
  GET_JOBS_OK,
  GET_JOBS_FAILED,
  GET_ONE_JOB_OK,
  GET_ONE_JOB_FAILED,
  DELETE_JOB_OK,
  PREPARE_TO_UPDATE,
  UPDATE_JOB_OK,
  CHANGE_FILTERS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "../constants/actionTypes";

const initialState = {
  showAlert: false,
  showOneJob: false,
  alertText: "",
  alertType: "",
  isLoading: false,
  isUpdating: false,
  updateJobId: "",
  job: {},
  jobName: "",
  companyName: "",
  jobLocation: "",
  technologies: "",
  sort: "likes",
  page: 1,
  limit: 10,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
};

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_ALERT: {
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.alertText,
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };
    }
    case WAITING_TO_FETCH: {
      return {
        ...state,
        isLoading: true,
        showOneJob: false,
      };
    }
    case CREATE_JOB_OK: {
      return {
        ...state,
        showOneJob: false,
        isUpdating: false,
        isLoading: false,
        job: action.payload,
      };
    }
    case CREATE_JOB_FAILED: {
      return {
        ...state,
        showOneJob: false,
        isLoading: false,
      };
    }
    case GET_JOBS_OK: {
      return {
        ...state,
        showOneJob: false,
        isUpdating: false,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.numberOfJobs,
        numOfPages: action.payload.numberOfPages,
      };
    }
    case GET_JOBS_FAILED: {
      return {
        ...state,
        showOneJob: false,
        isLoading: false,
      };
    }
    case GET_ONE_JOB_OK: {
      return {
        ...state,
        isLoading: false,
        showOneJob: true,
        job: action.payload,
      };
    }
    case GET_ONE_JOB_FAILED: {
      return {
        ...state,
        isLoading: false,
        showOneJob: false,
      };
    }
    case PREPARE_TO_UPDATE: {
      return {
        ...state,
        isUpdating: true,
        job: action.payload,
      };
    }
    case UPDATE_JOB_OK: {
      return {
        ...state,
        job: state.jobs.find((job) => job._id === action.payload._id),
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
        isLoading: false,
        isUpdating: false,
      };
    }
    case LIKE_JOB: {
      return {
        ...state,
        job: state.jobs.find((job) => job._id === action.payload._id),
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
        isLoading: false,
      };
    }
    case DELETE_JOB_OK: {
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };
    }
    case CHANGE_FILTERS: {
      return {
        ...state,
        jobName: action.payload.jobName,
        companyName: action.payload.companyName,
        jobLocation: action.payload.jobLocation,
        technologies: action.payload.technologies,
      };
    }
    case CLEAR_FILTERS: {
      return {
        ...state,
        jobName: "",
        companyName: "",
        jobLocation: "",
        technologies: "",
      };
    }
    case CHANGE_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case SORT_VALUE: {
      return {
        ...state,
        sort: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
