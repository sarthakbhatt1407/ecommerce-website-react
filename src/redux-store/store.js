import { createStore } from "redux";
const defaultState = {
  items: [],
  totalAmount: 0,
  emptyCart: true,
  isLoggedIn: false,
  userToken: "",
  userEmail: "",
};
const storeReducer = (state = defaultState, action) => {
  if (action.type === "reload") {
    return {
      ...action.item,
    };
  }
  if (action.type === "add") {
    const item = action.item;
    const updatedAmount = state.totalAmount + item.price;
    let updatedItems = [];
    const existingItemIndex = state.items.findIndex(
      (i) => i.id == item.id && i.name === item.name && i.color === item.color
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity,
        price: existingItem.price + item.price,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      const obj = {
        ...state,
        items: updatedItems,
        totalAmount: updatedAmount,
        emptyCart: false,
      };
      localStorage.setItem("state", JSON.stringify(obj));
      return {
        ...state,
        emptyCart: false,
        totalAmount: updatedAmount,
        items: updatedItems,
      };
    }
    const obj = {
      ...state,
      items: [...state.items, item],
      totalAmount: updatedAmount,
      emptyCart: false,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      emptyCart: false,
      totalAmount: updatedAmount,
      items: [...state.items, item],
    };
  } else if (action.type == "remove") {
    const totalAmount = state.totalAmount;
    let updatedAmount = totalAmount - action.item.price;

    let updatedItems = state.items.filter((item) => {
      return action.item.id != item.id;
    });
    const obj = {
      ...state,
      items: updatedItems,
      totalAmount: updatedAmount,
      emptyCart: state.items.length > 0 ? true : false,
    };
    localStorage.setItem("state", JSON.stringify(obj));

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }

  if (action.type === "quantityadd") {
    const item = action.item;
    const updatedAmount = state.totalAmount + action.itemPrice;
    let updatedItems = [];
    const existingItemIndex = state.items.findIndex(
      (i) => i.id == item.id && i.name === item.name && i.color === item.color
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.quantity,
        price: existingItem.price + action.itemPrice,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
      const obj = {
        ...state,
        items: updatedItems,
        totalAmount: updatedAmount,
        emptyCart: false,
      };
      localStorage.setItem("state", JSON.stringify(obj));
      return {
        ...state,
        emptyCart: false,
        totalAmount: updatedAmount,
        items: updatedItems,
      };
    }
  }
  if (action.type === "quantityremove") {
    const item = action.item;
    const updatedAmount = state.totalAmount - action.itemPrice;
    let updatedItems = [];
    const existingItemIndex = state.items.findIndex(
      (i) => i.id == item.id && i.name === item.name && i.color === item.color
    );
    const existingItem = state.items[existingItemIndex];
    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - action.quantity,
        price: existingItem.price - action.itemPrice,
      };
      if (updatedItem.quantity > 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
        const obj = {
          ...state,
          items: updatedItems,
          totalAmount: updatedAmount,
          emptyCart: false,
        };
        localStorage.setItem("state", JSON.stringify(obj));
        return {
          ...state,
          emptyCart: false,
          totalAmount: updatedAmount,
          items: updatedItems,
        };
      }
    }
  }
  if (action.type === "login") {
    const email = action.email;
    const idToken = action.idToken;
    const obj = {
      ...state,
      isLoggedIn: true,
      userEmail: email,
      userToken: idToken,
    };
    localStorage.setItem("state", JSON.stringify(obj));
    return {
      ...state,
      isLoggedIn: true,
      userEmail: email,
      userToken: idToken,
    };
  }
  if (action.type === "logout") {
    localStorage.clear();
    return {
      ...defaultState,
    };
  }
  return state;
};
const store = createStore(storeReducer);

export default store;
