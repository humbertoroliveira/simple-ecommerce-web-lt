const initialState = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  isRegistered: false,
  isLoggedIn: false,
  userId: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      state = action.payload;
      return state;
    default:
      return state;
  }
};
