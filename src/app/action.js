// this is a tool function to create action by composition
const createCounterAction = (type) => (amount) => ({
  type,
  payload: {
    amount,
  },
});

// Action creators
export const incrementBy = createCounterAction("COUNTER/INCREMENT");
export const decrementBy = createCounterAction("COUNTER/DECREMENT");

// Actions
export const INCREMENT = incrementBy(1);
export const DECREMENT = decrementBy(1);
export const SAVE = { type: "STORAGE/SAVE" };
