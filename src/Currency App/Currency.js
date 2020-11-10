import React, { useEffect, useState } from "react";
import Converter from "./Converter";
const Currency = (props) => {
  const [toggle, setToggle] = useState([]);
  const [first, setFirst] = useState();
  const [second, setSecond] = useState([]);
  const [exchange, setExchange] = useState();
  const [amount, setAmount] = useState("");
  const [amountCurrecy, setAmountCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountCurrecy) {
    fromAmount = amount;
    toAmount = amount * exchange;
  } else {
    toAmount = amount;
    fromAmount = amount / exchange;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((resp) => resp.json())
      .then((data) => {
        const firstOne = Object.keys(data.rates)[0];
        setToggle([data.base, ...Object.keys(data.rates)]);
        setFirst(data.base);
        setSecond(firstOne);
        setExchange(data.rates[firstOne]);
      });
  }, []);
  const handlefirstChange = (e) => {
    setAmount(e.target.value);
    setAmountCurrency(true);
  };
  const handleSecondChange = (e) => {
    setAmount(e.target.value);
    setAmountCurrency(false);
  };
  useEffect(() => {
    if (first != null && second != null) {
      fetch(`${BASE_URL}?base=${first}&symbols=${second}`)
        .then((resp) => resp.json())
        .then((data) => setExchange(data.rates[second]));
    }
  }, [first, second]);
  return (
    <div>
      <h1>Currency</h1>
      <Converter
        toggle={toggle}
        selectCurrency={first}
        changeCurrency={(e) => setFirst(e.target.value)}
        amount={fromAmount}
        handleChange={handlefirstChange}
      />
      <div>=</div>
      <Converter
        toggle={toggle}
        selectCurrency={second}
        changeCurrency={(e) => setSecond(e.target.value)}
        amount={toAmount}
        handleChange={handleSecondChange}
      />
    </div>
  );
};
export default Currency;

const BASE_URL = "https://api.exchangeratesapi.io/latest";
