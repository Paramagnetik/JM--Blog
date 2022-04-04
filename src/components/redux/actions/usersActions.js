import RealworldBlogApi from '../../../api/realworldBlogApi.js';

const { signUp, signIn, updateUser } = RealworldBlogApi;

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
  }
};

export const signInThunk = (value) => async (dispatch) => {
  const response = await signIn(value);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setUserSignUpAction());
  }
};

export const updateUserThunk = (value, token) => async (dispatch) => {
  const response = await updateUser(value, token);
  if (response.user) {
    dispatch(setUserAction(response.user));
    dispatch(setUserSignUpAction());
  }
};
