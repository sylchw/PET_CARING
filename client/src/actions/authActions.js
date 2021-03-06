import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utilities/SetAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { toast } from "react-toastify";

// Register a new user
export const registerUser = (registrationInfo, history) => dispatch => {
  axios
    .post("/api/user/register", registrationInfo)
    .then(res => {
      toast(res.data.message);
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      toast.error(err.response.data.message);
    });
};

// Login - Get user token
export const loginUser = userAccInfo => dispatch => {
  axios
    .post("/api/user/login", userAccInfo)
    .then(res => {
      const { token, message } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      toast.success(message);
    })
    .catch(err => {
      console.log("simi error", err);
      toast.error(err.response.data.message);
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
