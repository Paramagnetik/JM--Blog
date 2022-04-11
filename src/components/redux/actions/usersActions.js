import RealworldBlogApi from '../../../api/realworldBlogApi';

const { signUp, signIn, updateUser } = RealworldBlogApi;

export const SET_SERVER_ERRORS_ACTION = 'SET_SERVER_ERRORS_ACTION';
export const setServerErrorsAction = (payload) => ({
  type: SET_SERVER_ERRORS_ACTION,
  payload,
});

export const SET_USER_SUGN_UP_ACTION = 'SET_USER_SUGN_UP_ACTION';
export const setUserSignUpAction = () => ({
  type: SET_USER_SUGN_UP_ACTION,
});

export const SET_USER_ACTION = 'SET_USER_ACTION';
export const setUserAction = (payload) => {
  localStorage.setItem('user', JSON.stringify(payload));
  return {
    type: SET_USER_ACTION,
    payload,
  };
};

export const SET_USER_LOG_OUT_ACTION = 'SET_USER_LOG_OUT_ACTION';
export const setUserLogOutAction = () => {
  localStorage.removeItem('user');
  return {
    type: SET_USER_LOG_OUT_ACTION,
  };
};

export const signUpThunk = (value) => async (dispatch) => {
  const response = await signUp(value);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setUserSignUpAction());
    dispatch(setServerErrorsAction(null));
<<<<<<< HEAD
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }
=======
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }
>>>>>>> 577f1dc8a22054d69a93b123fbb5092740e71611
  return response;
};

export const signInThunk = (value) => async (dispatch) => {
  const response = await signIn(value);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setUserSignUpAction());
    dispatch(setServerErrorsAction(null));
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }
};

export const updateUserThunk = (value, token) => async (dispatch) => {
  const response = await updateUser(value, token);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setUserSignUpAction());
    dispatch(setServerErrorsAction(null));
  }
  if (response.errors) {
    dispatch(setServerErrorsAction(response.errors));
  }
  return response;
};

export const SET_SERVER_ERRORS_ACTION = 'SET_SERVER_ERRORS_ACTION';
export const setServerErrorsAction = (payload) => ({
  type: SET_SERVER_ERRORS_ACTION,
  payload,
});
