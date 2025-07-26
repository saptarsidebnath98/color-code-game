import React, { useEffect, useState } from "react";

const generateHexcolor = () => {
  const randomColor = Math.floor(Math.random() * 0xffffff);
  let hexColor = randomColor.toString(16).toUpperCase();
  hexColor = hexColor.padStart(6, "0");
  return `#${hexColor}`;
};

const shuffleArray = (currentItem, otherValues) => {
  const randomIndex = Math.floor(Math.random() * 3);
  const arr = [];
  for (let i = 0; i < 3; i++) {
    if (i === randomIndex) {
      arr[randomIndex] = currentItem;
    } else {
      arr[i] = otherValues();
    }
  }

  return arr;
};

function ColorCodeGame() {
  const [currentColor, setCurrentColor] = useState(generateHexcolor());

  const [hexColors, setHexColors] = useState(
    shuffleArray(currentColor, generateHexcolor)
  );

  const [isClicked, setIsClicked] = useState(false);

  const [result, setResult] = useState(null);

  const handleBoxClick = (color) => {
    if (!isClicked) {
      if (currentColor === color) {
        setResult("Correct!");
      } else {
        setResult("Incorrect!");
      }
      setIsClicked(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentColor(generateHexcolor());
    setResult(null);
    setIsClicked(false);
  };

  useEffect(() => {
    setHexColors(shuffleArray(currentColor, generateHexcolor));
  }, [currentColor]);

  return (
    <div className="game-container">
      <h1>Color Codes</h1>
      <p className="color-code">{currentColor}</p>
      <h3>What is this color?</h3>
      <div className="color-options">
        {hexColors.map((color) => (
          <div
            key={color}
            className="color-box"
            role="button"
            aria-label={`Color option ${color}`}
            style={{ backgroundColor: `${color}` }}
            tabIndex={0}
            onClick={() => handleBoxClick(color)}
          ></div>
        ))}
      </div>
      {result && (
        <>
          <p className="feedback">{result}</p>
          <button className="play-again-btn" onClick={handlePlayAgain}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}
export default ColorCodeGame;
