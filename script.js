"use strict";

// # for id, . (dot) for class
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");

// Initial Condition

let score, currentScore, activePlayer, playing;

function init() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  score = [0, 0];

  currentScore = 0;
  activePlayer = 0;

  diceEl.classList.add("hidden");

  playing = true;

  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player1EL.classList.remove("player--active");
  player0EL.classList.add("player--active");
}

init();

// Switching Player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Selects which player is active and where the score is added
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  // Changing style when player is active
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
}

// Rolling Dice
btnRoll.addEventListener("click", function () {
  if (playing) {
    diceEl.classList.remove("hidden");
    //     const dice = Math.trunc(Math.random() * 6) + 1;

    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;

    console.log(dice);
    // Current Score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding Number
btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 50) {
      // Finish Game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
});

// New Game
btnNew.addEventListener("click", init);
