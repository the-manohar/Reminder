export const addReminder = (text, dueDate) => {
  const action = {
    type: "ADD_REMINDER",
    text,
    dueDate,
  };
  return action;
};

export const deleteReminder = (id) => {
  const action = {
    type: "DELETE_REMINDER",
    id,
  };
  return action;
};

export const clearReminder = () => {
  return {
    type: "CLEAR_REMINDER",
  };
};
