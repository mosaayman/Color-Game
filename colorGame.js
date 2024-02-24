"use strict";

const colorDisplayEl = document.querySelector("#colorDisplay");
const resetBtn = document.querySelector("#reset");
const displayResutlEl = document.getElementById("message");
const easyBtn = document.querySelector("#easyBtn");
const hardBtn = document.querySelector("#hardBtn");
const circles = document.querySelectorAll(".square");
const h1 = document.querySelector("h1");
const container = document.querySelector("#container");

const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randColor = () => {
  return `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;
};

const getColor = (element) => {
  return element.style.backgroundColor;
};

const setColorForCircle = (element) => {
  element.style.backgroundColor = `${randColor()}`;
  return element.style.backgroundColor;
};

const setColorForAll = (array) => {
  const listOfColors = [];
  for (const circle of array) {
    if (circle.classList.contains("hidden")) {
      continue;
    }
    const rgbColor = setColorForCircle(circle);
    listOfColors.push(rgbColor);
  }
  console.log(listOfColors);
  return listOfColors;
};

const displayRandColor = (colors) => {
  const randomIndex = randInt(0, colors.length - 1);
  console.log(randomIndex);
  const randomColor = colors[randomIndex];
  colorDisplayEl.textContent = randomColor;
};

const win = () => {
  container.classList.add("unclickable");
  displayResutlEl.textContent = "Correct";

  for (const element of circles) {
    element.classList.remove("hidden");
    element.style.backgroundColor = colorDisplayEl.textContent;
  }
  Headers.style.backgroundColor = colorDisplayEl.textContent;

  resetBtn.textContent = "Play Again!!";
};

const tryAgain = (wrongCircle) => {
  displayResutlEl.textContent = "Try Again";
  wrongCircle.classList.add("hidden");
};

const resetElement = () => {
  resetBtn.textContent = "NEW COLORS!";

  container.classList.remove("unclickable");

  for (const element of circles) {
    element.classList.remove("hidden");
  }
};

const resetGame = () => {
  resetElement();
  const arrayOFColors = setColorForAll(circles);
  displayRandColor(arrayOFColors);
};

resetBtn.addEventListener("click", resetGame);

container.addEventListener("click", (event) => {
  const clickedElemnt = event.target;

  if (clickedElemnt.nodeName === "DIV" && clickedElemnt.id !== "contaniner") {
    console.log("div is cliced");
    const selecctedColor = getColor(clickedElemnt);
    const displayedColor = colorDisplayEl.textContent;

    if (selecctedColor === displayedColor) {
      win();
    } else {
      tryAgain(clickedElemnt);
    }
  }
});
