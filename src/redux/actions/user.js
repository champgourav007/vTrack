export const UserType = {
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  GET_ALL_USER_DETAILS: 'GET_ALL_USER_DETAILS',
  SET_ALL_USER_DETAILS: 'SET_ALL_USER_DETAILS',
};

export const getUserDetails = () => 
({
  type: UserType.GET_USER_DETAILS
});

export const setUserDetails = (data) => 
({
  type: UserType.SET_USER_DETAILS,
  payload: { data },
});

export const getAllUserDetails = () => 
({
  type: UserType.GET_ALL_USER_DETAILS,
});

export const setAllUserDetails = (data) => 
({
  type: UserType.SET_ALL_USER_DETAILS,
  payload: { data },
});
