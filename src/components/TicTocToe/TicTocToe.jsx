import React, { useRef, useState } from "react";
import "./TicTocToc.css";
import circle_icon from "../assets/circle.png";
import cross_icon from "../assets/cross.png";

function TicTocToe() {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || data[index]) return;

    const newData = data.slice();
    newData[index] = count % 2 === 0 ? "x" : "O";
    setData(newData);
    setCount(count + 1);

    if (checkWin(newData)) {
      setLock(true);
      const winner = newData[index];
      titleRef.current.innerHTML = `Congratulations: <img src='${
        winner === "x" ? cross_icon : circle_icon
      }' />`;
    }
  };

  const checkWin = (data) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some((pattern) => {
      const [a, b, c] = pattern;
      return data[a] && data[a] === data[b] && data[a] === data[c];
    });
  };

  const reset = () => {
    setLock(false);
    setCount(0);
    setData(["", "", "", "", "", "", "", "", ""]);
    titleRef.current.innerHTML = `Tic Tac Toe game in <span>React</span>`;
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe game in <span>React</span>
      </h1>
      <div className="board">
        {data.map((value, index) => (
          <div key={index} className="boxes" onClick={() => toggle(index)}>
            {value && (
              <img src={value === "x" ? cross_icon : circle_icon} alt={value} />
            )}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default TicTocToe;
