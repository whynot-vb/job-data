import * as api from "../api";
import {
  OPERATION_USER_BEGIN,
  REGISTER_USER_OK,
  REGISTER_USER_ERROR,
  LOGIN_USER_OK,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from "../constants/actionTypes";

import { displayAlert } from "./job";

export const addUserToLocalStorage = ({ user, token }) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const register = (newUser, history) => async (dispatch) => {
  dispatch({ type: OPERATION_USER_BEGIN });
  try {
    const { data } = await api.register(newUser);
    const { user, token } = data;
    dispatch({ type: REGISTER_USER_OK, payload: { user, token } });
    addUserToLocalStorage({ user, token });
    dispatch(
      displayAlert(
        "success",
        "You successfully registered. Rerouting to the home page."
      )
    );
    setTimeout(() => history.push("/"), 2000);
  } catch (error) {
    dispatch({ type: REGISTER_USER_ERROR });
    dispatch(
      displayAlert(
        "error",
        "Failed to register user. Please provide all the required fields"
      )
    );
  }
};

export const login = (existingUser, history) => async (dispatch) => {
  dispatch({ type: OPERATION_USER_BEGIN });
  try {
    const { data } = await api.login(existingUser);
    const { user, token } = data;
    dispatch({ type: LOGIN_USER_OK, payload: { user, token } });
    addUserToLocalStorage({ user, token });
    dispatch(
      displayAlert(
        "success",
        "You logged in successfully. Rerouting to the home page."
      )
    );
    setTimeout(() => history.push("/"), 2000);
  } catch (error) {
    dispatch({ type: LOGIN_USER_ERROR });
    dispatch(displayAlert("error", "Failed to login user"));
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  removeUserFromLocalStorage();
};
