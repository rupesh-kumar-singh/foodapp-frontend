import React, { createContext, useContext, useReducer } from "react";

const cartstatecontext = createContext();
const cartdispatchcontext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newarray = [...state];
      newarray.splice(action.index, 1);
      return newarray;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;
    case "DROP":
      let emparray = [];
      return emparray;

    default:
      console.log("error in reducer");
  }
};

export const Cartprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartdispatchcontext.Provider value={dispatch}>
      <cartstatecontext.Provider value={state}>
        {children}
      </cartstatecontext.Provider>
    </cartdispatchcontext.Provider>
  );
};

export const Usecart = () => useContext(cartstatecontext);
export const Usedispatchcart = () => useContext(cartdispatchcontext);
