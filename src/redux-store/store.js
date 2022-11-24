import { createStore } from "redux";
const defaultState = {
  items: [],
  totalAmount: 0,
  emptyCart: true,
};
const storeReducer = (state = defaultState, action) => {
  return state;
};
const store = createStore(storeReducer);

export default store;
