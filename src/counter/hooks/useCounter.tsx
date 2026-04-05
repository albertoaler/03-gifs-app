import { useState } from "react";

// We can create a customHook using the word useCustomHook
export const useCounter = (initialValue: number = 0) => {

  // It is the same business logic
  const [counter, setCounter] = useState(initialValue);

  const handleAdd = () => {
    setCounter(counter + 1);
  };

  const handleSubtract = () => {
    if (counter == 0) return;

    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(initialValue);
  };

  // The difference is that we return an object or value instead of a component
  return {
    // Values
    counter,

    // Methods / Actions
    handleAdd,
    handleSubtract,
    handleReset
  };
};
