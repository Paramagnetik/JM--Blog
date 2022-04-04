import { SET_USER_ACTION, SET_USER_SUGN_UP_ACTION, SET_USER_LOG_OUT_ACTION } from '../actions/usersActions.js';

const userData = localStorage.getItem('user');

export const initialState =
  userData !== 'undefined'
    ? {
        ...JSON.parse(userData),
        isSignUp: true,
      }
    : {
        isSignUp: false,
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
        ...state,
        isSignUp: false,
      };

    default:
      return state;
  }
};

export default users;
