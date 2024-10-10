export const CLEAR_STATE = "CLEAR_STATE";
export const ADD_USER = "ADD_USER";
export const ADD_ATTENDING = "ADD_ATTENDING";
export const REMOVE_ATTENDING = "REMOVE_ATTENDING";
export const UPDATE_ATTENDING = "UPDATE_ATTENDING";

export const clearState = () => ({
  type: CLEAR_STATE,
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addAttending = (data) => ({
  type: ADD_ATTENDING,
  payload: data,
});

export const removeAttending = (data) => ({
  type: REMOVE_ATTENDING,
  payload: data,
});

export const updateAttending = (data) => ({
  type: UPDATE_ATTENDING,
  payload: data,
});
