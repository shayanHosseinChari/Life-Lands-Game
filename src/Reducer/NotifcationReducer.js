export const NotifcationReducer = (state = [], action) => {
  switch (action?.type) {
    case "ADD_NOTIF":
      return [...state, action.payload];

    case "REMOVE_NOTIF":
      let filteredNotifcatin = state.filter((item) => {
        return item._id != action.payload._id;
      });
      return [...filteredNotifcatin];
    case "CLEAR_NOTIF":
      return [];
    default:
      return state;
  }
};
