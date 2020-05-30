const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
document.addEventListener("click", function(event){
  const tagName = event.target.tagName;
  if (tagName==="BUTTON"){
    createDivsForColors(shuffledColors);
    event.target.remove();
  }
});

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!

function handleCardClick(event) {
  
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;
  // you can use event.target to see which element was clicked
  
  let cardClicked = event.target

  if (event.target.classList.value === "red" || "blue" || "green" || "orange" || "purple") {
    event.target.style.backgroundColor = cardClicked.classList.value;
  }

  //unsure about this part, this was taken from the answer solution
  if (!card1 || !card2) {
    cardClicked.classList.add("flipped");
    card1 = card1 || cardClicked;
    card2 = cardClicked === card1 ? null : cardClicked;
  }

  //unsure about this part as well
  if (card1 && card2) {
    noClicking = true;
    // debugger
    let flipped1 = card1.className;
    let flipped2 = card2.className;

    if (flipped1 === flipped2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  let restartButton = document.createElement("button");
  restartButton.innerText = "Restart?";

  if (cardsFlipped === COLORS.length){
    gameContainer.appendChild(restartButton);
    restartButton.addEventListener("click", function(event){
      const tagName = event.target.tagName;
      if (tagName === "BUTTON"){
        location.reload();
      }
    })
  } 
}
