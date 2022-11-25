import React, { useState, useEffect } from "react";
import getTheme from "../funtions/getTheme";

export default function Calculator() {
  const [calcData, setCalcData] = useState({
    nums: Array(1).fill(""),
    sign: "",
  });

  const [theme, setTheme] = useState(1);

  useEffect(() => {
    const themeObj = getTheme(theme);
    Object.entries(themeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--${String(key).replaceAll("_", "-")}`,
        value
      );
    });
  }, [theme]);

  const screenValue =
    calcData.nums[0] +
    String(calcData.sign ? " " + calcData.sign + " " + calcData.nums[1] : "");

  const roundToTwo = (num) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  };

  const calculate = (num1, num2, sign) => {
    switch (sign) {
      case "+":
        return String(roundToTwo(Number(num1) + Number(num2)));
      case "-":
        return String(roundToTwo(Number(num1) - Number(num2)));
      case "x":
        return String(roundToTwo(Number(num1) * Number(num2)));
      case "/":
        return String(roundToTwo(Number(num1) / Number(num2)));
      default:
        break;
    }
  };

  const handleNumberClick = (event) => {
    const buttonValue = event.target.innerText;
    setCalcData((prevCalcData) => {
      const lastNum = prevCalcData.nums.length - 1;
      const newNums = [...prevCalcData.nums];
      newNums[lastNum] = newNums[lastNum] + buttonValue;

      return { ...prevCalcData, nums: newNums };
    });
  };

  const handleDelClick = () => {
    setCalcData((prevCalcData) => {
      const lastNum = prevCalcData.nums.length - 1;
      const newNums = [...prevCalcData.nums];
      const strLen = prevCalcData.nums[lastNum].length;
      newNums[lastNum] =
        strLen > 0
          ? newNums[lastNum].substring(0, strLen - 1)
          : newNums[lastNum];
      return {
        ...prevCalcData,
        nums: newNums,
      };
    });
  };

  const handleResetClick = () => {
    setCalcData({ nums: Array(1).fill(""), sign: "" });
  };

  const handleSignClick = (event) => {
    const sign = event.target.innerText;

    if (calcData.nums.length < 2) {
      setCalcData((prevCalcData) => {
        const newNums = [...prevCalcData.nums];
        newNums.push("");
        return {
          nums: newNums,
          sign: sign,
        };
      });
    } else {
      setCalcData((prevCalcData) => {
        const prevSign = prevCalcData.sign;
        const newNums = [...prevCalcData.nums];
        newNums[0] = calculate(newNums[0], newNums[1], prevSign);
        newNums[1] = "";
        return {
          nums: newNums,
          sign: sign,
        };
      });
    }
  };

  const handleEqualsClick = () => {
    if (calcData.nums.length < 2) return;
    setCalcData((prevCalcData) => {
      const num1 = prevCalcData.nums[0];
      const num2 = prevCalcData.nums[1];
      const sign = prevCalcData.sign;
      return {
        nums: Array(1).fill(calculate(num1, num2, sign)),
        sign: "",
      };
    });
  };

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
  };

  //console.log(calculate("10", "1", "/"));

  return (
    <div className="calculator-body">
      <div className="head">
        <p>calc</p>
        <div className="theme">
          <p>THEME</p>
          <div>
            <div
              style={{
                display: "flex",
                gap: "18px",
                justifyContent: "flex-end",
                paddingRight: "9px",
              }}
            >
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              value={theme}
              onChange={handleThemeChange}
            />
          </div>
        </div>
      </div>
      <input type="text" value={screenValue} readOnly disabled />
      <div className="buttons-grid">
        <div className="button" onClick={handleNumberClick}>
          7
        </div>
        <div className="button" onClick={handleNumberClick}>
          8
        </div>
        <div className="button" onClick={handleNumberClick}>
          9
        </div>
        <div className="button blue" onClick={handleDelClick}>
          DEL
        </div>
        <div className="button" onClick={handleNumberClick}>
          4
        </div>
        <div className="button" onClick={handleNumberClick}>
          5
        </div>
        <div className="button" onClick={handleNumberClick}>
          6
        </div>
        <div className="button" onClick={handleSignClick}>
          +
        </div>
        <div className="button" onClick={handleNumberClick}>
          1
        </div>
        <div className="button" onClick={handleNumberClick}>
          2
        </div>
        <div className="button" onClick={handleNumberClick}>
          3
        </div>
        <div className="button" onClick={handleSignClick}>
          -
        </div>
        <div className="button" onClick={handleNumberClick}>
          .
        </div>
        <div className="button" onClick={handleNumberClick}>
          0
        </div>
        <div className="button" onClick={handleSignClick}>
          /
        </div>
        <div className="button" onClick={handleSignClick}>
          x
        </div>
        <div className="button double blue" onClick={handleResetClick}>
          RESET
        </div>
        <div className="button double red" onClick={handleEqualsClick}>
          =
        </div>
      </div>
    </div>
  );
}
