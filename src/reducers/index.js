import { bake_cookie, read_cookie } from "sfcookies";
const reminder = (action) => {
  const { text, dueDate } = action;
  return {
    id: Math.random(),
    text,
    dueDate,
  };
};

const removeId = (state = [], id) => {
  const reminders = state.filter((reminder) => reminder.id !== id);
  return reminders;
};
const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie("reminders");
  switch (action.type) {
    case "ADD_REMINDER":
      reminders = [...state, reminder(action)];
      bake_cookie("reminders", reminders);
      return reminders;
    case "DELETE_REMINDER":
      reminders = removeId(state, action.id);
      bake_cookie("reminders", reminders);
      return reminders;
    case "CLEAR_REMINDER":
      reminders = [];
      bake_cookie("reminders", reminders);
      return reminders;
    default:
      return state;
  }
};

export default reminders;
