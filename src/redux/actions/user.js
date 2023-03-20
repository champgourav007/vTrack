export const UserType = {
  GET_USER_DETAILS: 'GET_USER_DETAILS',
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  GET_ALL_USER_DETAILS: 'GET_ALL_USER_DETAILS',
  SET_ALL_USER_DETAILS_DICT: 'SET_ALL_USER_DETAILS_DICT',
  SET_ALL_USER_DETAILS: 'SET_ALL_USER_DETAILS',
  GET_UNREGISTERED_USER_DETAILS: 'GET_UNREGISTERED_USER_DETAILS',
  SET_UNREGISTERED_USER_DETAILS: 'SET_UNREGISTERED_USER_DETAILS',
  GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  UPDATE_NOTIFICATION: 'UPDATE_NOTIFICATION',
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

export const setAllUserDetailsDict = (data) =>
({
  type : UserType.SET_ALL_USER_DETAILS_DICT,
  payload: data
})

export const getUnregisteredUserDetails = () => 
({
  type: UserType.GET_UNREGISTERED_USER_DETAILS
});

export const setUnregisteredUserDetails = (data) => 
({
  type: UserType.SET_UNREGISTERED_USER_DETAILS,
  payload:data,
});

export const getNotifications = () => 
({
  type: UserType.GET_NOTIFICATIONS,
})

export const setNotificationsList = (data) =>
({
  type: UserType.SET_NOTIFICATIONS,
  payload: data,
})

export const updateNotification = (data) =>
({
  type: UserType.UPDATE_NOTIFICATION,
  payload: data,
})