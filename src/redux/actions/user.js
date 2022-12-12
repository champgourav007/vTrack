export const UserType = {
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  SET_USER_DETAILS: 'SET_USER_DETAILS'
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
