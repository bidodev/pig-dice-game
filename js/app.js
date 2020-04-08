/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;

//function newGame

/** Steps
 * reset the current scores to 0
 * remove dice image
 * set player 1 as active.
 */
const arrCurrent = document.querySelectorAll(".clear-score");

const resetGame = () => {
  console.log(arrCurrent);
  arrCurrent.forEach((element) => {
    element.textContent = 0;
  });

  //hide the dice
  const diceImg = document.querySelector(`.dice`);
  diceImg.classList.toggle("hide");
};

//button roll dice

/** Steps
 * generate a random number between 1 and 6
 * update the user interface
 * check if the play won the game
 */
const btnRoll = document.querySelector(`.btn-roll`);

btnRoll.addEventListener("click", () => {
  //generate a random number
  const dice = Math.floor(Math.random() * 6 + 1);

  //change de dice image to match the value of the random number
  const diceDOM = document.querySelector(`.dice`);
  diceDOM.style.display = "block";
  diceDOM.src = `img/dice-${dice}.png`;

  if (dice !== 1) {
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    //nextplayer
    nextPlayer();
  }

  //setting a value
});

//button hold

/** Steps
 * add the current score to the global score
 * update the user interface
 * check if the play won the game
 */
const btnHold = document.querySelector(`.btn-hold`);

btnHold.addEventListener("click", () => {
  const scoreHolder = document.querySelector(`#score-${activePlayer}`);
  const winnerPlayer = document.querySelector(`#name-${activePlayer}`);

  //adding the current score the global score.
  scores[activePlayer] += roundScore;
  //console.log(activePlayer);

  //updating the user interface;
  scoreHolder.textContent = scores[activePlayer];

  //check if the player won the game..
  if (scores[activePlayer] >= 10) {
    winnerPlayer.textContent = "Winner";
    resetGame();
  } else {
    nextPlayer();
  }
});

//button new game
/**
 * call function newGame()
 * reset all the variables to default
 */
const btnNew = document.querySelector(`.btn-new`);
btnNew.addEventListener("click", resetGame);
