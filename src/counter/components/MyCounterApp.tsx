import { useCounter } from "../hooks/useCounter";

interface Props {
  initialValue?: number;
}

export const MyCounterApp = ({ initialValue }: Props) => {
  const { counter, handleAdd, handleSubtract, handleReset } = useCounter(initialValue);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Counter: {counter}</h1>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubtract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
