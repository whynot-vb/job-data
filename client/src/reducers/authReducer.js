import {
  OPERATION_USER_BEGIN,
  REGISTER_USER_OK,
  REGISTER_USER_ERROR,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_OK,
  UPDATE_USER_ERROR,
} from "../constants/actionTypes";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  user: user ? JSON.parse(user) : null,
  token: token,
};
//JSON.parse(user)
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case OPERATION_USER_BEGIN: {
      return { ...state, isLoading: true };
    }
    case REGISTER_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGIN_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case LOGIN_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLoading: false,
        user: null,
        token: null,
      };
    }
    case UPDATE_USER_OK: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}
