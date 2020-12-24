import { createSlice } from "@reduxjs/toolkit";
import { login, register, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";

export const userReducer = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoadingUser: false,
    isLoadingGetMe: false,
    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },

    setIsLoadingGetMe: (state, action) => {
      state.isLoadingGetMe = action.payload;
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setUser,
  setIsLoadingUser,
  setIsLoadingGetMe,
  setErrorMessage,
} = userReducer.actions;

export const userLogin = (username, password) => (dispatch) => {
  return login(username, password).then((data) => {
    dispatch(setIsLoadingUser(false));
    if (data.ok === 0) {
      return dispatch(setErrorMessage(data.message));
    }
    setAuthToken(data.token);
    return data;
  });
};

export const userRegister = (nickname, username, password) => (dispatch) => {
  return register(nickname, username, password).then((data) => {
    dispatch(setIsLoadingUser(false));
    if (data.ok === 0) {
      return dispatch(setErrorMessage(data.message));
    }
    setAuthToken(data.token);
    return data;
  });
};

export const getUser = () => (dispatch) => {
  dispatch(setIsLoadingGetMe(true));
  return getMe()
    .then((response) => {
      if (response.ok !== 1) {
        setAuthToken("");
        return dispatch(setErrorMessage(response.toString()));
      }
      dispatch(setUser(response.data));
      dispatch(setIsLoadingGetMe(false));
      return response;
    })
    .catch((err) => {
      return dispatch(setErrorMessage(err));
    });
};

export default userReducer.reducer;
