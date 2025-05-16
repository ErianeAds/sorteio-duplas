const gameBoard = document.getElementById("gameBoard");
const startBtn = document.getElementById("startBtn");
const pairCountInput = document.getElementById("pairCount");
const winMessage = document.getElementById("winMessage");

let flippedCount = 0;

const cuteMessages = [
  "Você é incrível!",
  "Amor sempre!",
  "Sorria!",
  "Seja feliz!",
  "Força e fé!",
  "Brilhe muito!",
  "Você consegue!",
  "Tudo de bom!",
  "Luz e paz!",
  "Você é luz!",
  "Espalhe amor!",
  "Confie sempre!",
  "Você é único!",
  "Seja gentil!",
  "Acredite!",
  "Gratidão!",
  "Paz interior!",
  "Você é forte!",
  "Seja luz!",
  "Nunca desista!"
];

startBtn.addEventListener("click", () => {
  const pairCount = parseInt(pairCountInput.value);
  if (isNaN(pairCount) || pairCount < 1 || pairCount > 20) return;

  resetGame();
  createCards(pairCount);
});

function resetGame() {
  gameBoard.innerHTML = "";
  winMessage.textContent = "";
  flippedCount = 0;
}

function createCards(pairs) {
  const colors = generateColors(pairs);
  const cardData = [];
  for (let i = 0; i < pairs; i++) {
    cardData.push({
      color: colors[i],
      number: i + 1,
      message: cuteMessages[i] || "Você é incrível!"
    });
  }
  const doubled = [...cardData, ...cardData].sort(() => Math.random() - 0.5);

  doubled.forEach(data => {
    const card = createCard(data);
    gameBoard.appendChild(card);
  });
}
function createCard({ color, number }) {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");
  front.style.backgroundColor = color;
  front.innerHTML = `<div class="card-number">${number}</div>`;

  const back = document.createElement("div");
  back.classList.add("card-back");
  back.textContent = "?";

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => handleFlip(card));

  return card;
}


function handleFlip(card) {
  if (card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCount++;

  const totalCards = parseInt(pairCountInput.value) * 2;
  if (flippedCount === totalCards) {
    winMessage.textContent = "Ótimo! todas as duplas formadas";
  }
}

function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    colors.push(`hsl(${hue}, 100%, 50%)`);
  }
  return colors;
}
