import React from "react";
const Converter = (props) => {
  const {
    toggle,
    selectCurrency,
    changeCurrency,
    amount,
    handleChange,
  } = props;
  return (
    <div>
      <input
        type="number"
        placeholder="Currency"
        value={amount}
        onChange={handleChange}
      />
      <select value={selectCurrency} onChange={changeCurrency}>
        {toggle.map((toggle) => (
          <option key={toggle} value={toggle}>
            {toggle}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Converter;
