const baseCardTypes = [
  { imgSrc: "5414123.png", dataSuit: "diamond" },
  { imgSrc: "5414130.png", dataSuit: "heart" },
  { imgSrc: "5414140.png", dataSuit: "spades" },
  { imgSrc: "5414149.png", dataSuit: "clovers" },
  { imgSrc: "5415187.png", dataSuit: "heartK" },
  { imgSrc: "5415194.png", dataSuit: "spadesA" },
];

var isMatch = 0;
var x = 4, y = 3;
let firstCard, secondCard;
let gridContainer = document.getElementById("gridContainer");

function flipCard() {
  if (firstCard === undefined) {
      firstCard = this;
      firstCard.classList.add("flip");
      firstCard.removeEventListener("click", flipCard);
    } else if (secondCard === undefined) {
      secondCard = this;
      secondCard.classList.add("flip");
      secondCard.removeEventListener("click", flipCard);
    }
  checking();
}

function createBoard(x, y) {
  const cardTypes = [...baseCardTypes, ...baseCardTypes];

  while (cardTypes.length < x * y) {
     const randomNum = Math.floor(Math.random() * baseCardTypes.length);
     cardTypes.push(baseCardTypes[randomNum], baseCardTypes[randomNum]);
     console.log(randomNum);
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
}

function selectChange() {
  const select = document.getElementById("size");
  gridContainer.innerHTML = "";
  firstCard = undefined;

  if (select.selectedIndex === 0) {
    createBoard(4, 3);
    x = 4;
    y = 3;
  }
  else if (select.selectedIndex === 1) {
    createBoard(5, 4);
    x = 5;
    y = 4;
  }
  else if (select.selectedIndex === 2) {
    createBoard(6, 5);
    x = 6;
    y = 5;
  }
}

function checking() {
  let audio;

  if (firstCard.dataset.suit === secondCard.dataset.suit) {
      isMatch++;
    audio = new Audio("Audios/matching.mp3");
    reset();
  } else {
    audio = new Audio("Audios/popping.mp3");

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

        firstCard.addEventListener("click", flipCard);
        secondCard.addEventListener("click", flipCard);
     reset();
    }, 500);
  }

  audio.currentTime = 0;
  audio.play().then();

  const modal = document.getElementById("myModal");
  const closeButton = document.getElementById("startAgain");
  if(isMatch === ((x * y) / 2)) {
    setTimeout(() => {
      modal.style.display = "block";
      }, 500);
    closeButton.onclick = function () {
      modal.style.display = "none";
      gridContainer.innerHTML = "";
      createBoard(4, 3);
    }
  }
}

function reset() {
  firstCard = undefined;
  secondCard = undefined;
}

createBoard(4, 3);