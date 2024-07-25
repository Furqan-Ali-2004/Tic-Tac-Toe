let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // player X ,player O

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  updateBoxColors();
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O";
      box.classList.add("O");
      box.classList.remove("X");
      turnO = false;
    } else {
      box.innerHTML = "X";
      box.classList.add("X");
      box.classList.remove("O");
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
    updateBoxColors();
  });
});

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("X", "O");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const updateBoxColors = () => {
  boxes.forEach((box) => {
    if (!box.disabled) {
      if (turnO) {
        box.style.color = "rgb(255, 128, 128)"; // Light red for O
        box.style.textShadow =
          "0 1px 2px rgba(0, 0, 0, 0.7), 0 0 5px rgba(255, 128, 128, 0.5), 0 0 10px rgba(255, 128, 128, 0.5), 0 0 20px rgba(255, 128, 128, 0.5), 0 0 40px rgba(255, 128, 128, 0.5)";
      } else {
        box.style.color = "rgb(10, 142, 139)"; // Same color as the game box shadow for X
        box.style.textShadow =
          "0 1px 2px rgba(0, 0, 0, 0.7), 0 0 5px rgba(10, 142, 139, 0.5), 0 0 10px rgba(10, 142, 139, 0.5), 0 0 20px rgba(10, 142, 139, 0.5), 0 0 40px rgba(10, 142, 139, 0.5)";
      }
    }
  });
};

newGameBtn.addEventListener("click", () => {
  resetGame();
  boxes.classList.add("active");
});

resetBtn.addEventListener("click", resetGame);

updateBoxColors();
