import {
  SET_USER_ACTION,
  SET_USER_SUGN_UP_ACTION,
  SET_USER_LOG_OUT_ACTION,
  SET_SERVER_ERRORS_ACTION,
} from '../actions/usersActions';

const userData = localStorage.getItem('user');

export const initialState = userData
  ? {
    ...JSON.parse(userData),
    isSignUp: true,
    serverErrors: null,
  }:
  {
    isSignUp: false,
    serverErrors: null,
  };

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_SUGN_UP_ACTION:
      return {
        ...state,
        isSignUp: true,
      };
    case SET_USER_ACTION:
      return {
        ...state,
        ...payload,
      };
    case SET_USER_LOG_OUT_ACTION:
      return {
        serverErrors: null,
        isSignUp: false,
      };
    case SET_SERVER_ERRORS_ACTION:
      return {
        ...state,
        serverErrors: payload,
      };

    default:
      return state;
  }
};

export default users;
