import ACTION_TYPES from './ActionTypes.js';

export const fetchLoginData = () => ({
  type: ACTION_TYPES.LOGIN_PENDING,
});

export const fetchLoginSuccess = (data) => ({
  type: ACTION_TYPES.LOGIN_SUCCESS,
  payload: data,
});

export const fetchLoginError = (error) => ({
  type: ACTION_TYPES.LOGIN_ERROR,
  payload: error,
});