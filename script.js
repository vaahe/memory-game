const cards = document.querySelectorAll(".card");

const baseCardTypes = [
  { imgSrc: "5414123.png", dataSuit: "diamond" },
  { imgSrc: "5414123.png", dataSuit: "diamond" },
  { imgSrc: "5414130.png", dataSuit: "heart" },
  { imgSrc: "5414130.png", dataSuit: "heart" },
  { imgSrc: "5414140.png", dataSuit: "spades" },
  { imgSrc: "5414140.png", dataSuit: "spades" },
  { imgSrc: "5414149.png", dataSuit: "clovers" },
  { imgSrc: "5414149.png", dataSuit: "clovers" },
  { imgSrc: "5415187.png", dataSuit: "heartK" },
  { imgSrc: "5415187.png", dataSuit: "heartK" },
  { imgSrc: "5415194.png", dataSuit: "spadesA" },
  { imgSrc: "5415194.png", dataSuit: "spadesA" },
];

let flippedCard = false;
let firstCard, secondCard;
let isMatch = 0;

function flipCard() {
  this.classList.add("flip");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
  } else {
    flippedCard = true;
    secondCard = this;
  }

  checking();
}

cards.forEach((card) => card.addEventListener("click", flipCard));

function checking() {
  if (firstCard.dataset.suit === secondCard.dataset.suit) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    let audio;
    audio = new Audio("Audios/matching.mp3");
    audio.currentTime = 0;
    audio.play().then();
    reFlip();
  } else {
    let audio;
    audio = new Audio("Audios/popping.mp3");
    audio.currentTime = 0;
    audio.play().then();

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      reFlip();
    }, 500);
  }
}

function reFlip() {
  flippedCard = false;
  [firstCard, secondCard] = [null, null];
}

let gridContainer = document.createElement("div");

function createBoard(x, y) {
  let cardTypes = [...baseCardTypes];
  while (cardTypes.length < x * y) {
    const randomNum = Math.floor(Math.random() * baseCardTypes.length); // Number from 0 to 11
    cardTypes.push(baseCardTypes[randomNum], baseCardTypes[randomNum]);
  }

  gridContainer.classList.add("grid-container");
  gridContainer.style.grid = "repeat(" + x + ", auto) / repeat(" + y + ", auto)";

  for (let i = 0; i < x * y; i++) {
    const randomNum = Math.floor(Math.random() * cardTypes.length);
    const card = cardTypes[randomNum];
    cardTypes.splice(randomNum, 1);

    const cardElement = document.createElement("div");
    cardElement.classList.add("fade");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-suit", card.dataSuit);
    cardElement.addEventListener("click", flipCard);

    const cardFace = document.createElement("img");
    cardFace.classList.add("front-face");
    cardFace.setAttribute("src", "Images/" + card.imgSrc);
    cardFace.setAttribute("alt", card.dataSuit);

    const cardBack = document.createElement("img");
    cardBack.classList.add("back-face");
    cardBack.setAttribute("src", "Images/card.png");
    cardBack.setAttribute("alt", "card");

    cardElement.appendChild(cardFace);
    cardElement.appendChild(cardBack);

    gridContainer.appendChild(cardElement);
  }

  document.body.appendChild(gridContainer);

  console.table(baseCardTypes);
  console.table(cardTypes);
  if (firstCard.dataset.suit === secondCard.dataset.suit) isMatch++;
  if(isMatch === (x * y) / 2) alert("Congratulations. You won!");
}

function SelectChange() {
  let select = document.getElementById("size");
  gridContainer.innerHTML = "";

    if (select.selectedIndex === 0) {
      createBoard(4, 3);
    } else if (select.selectedIndex === 1) {
      createBoard(5, 4);
    } else {
      createBoard(6, 5);
    }
  }

createBoard(4, 3);