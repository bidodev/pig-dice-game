/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a diceNumber as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let isRunning = true;

const elements = {
  //dice image
  diceImg: document.querySelector(`.dice`),

  //button roll dice
  btnRoll: document.querySelector(`.btn-roll`),

  //class with all the scores (current and global scores)
  clearScores: document.querySelectorAll(".clear-score"),
};

//function to generate a random number
const randomNumber = () => Math.floor(Math.random() * 6 + 1);

//function to reset the scores and remove the dice image
const resetGame = () => {
  document.querySelector(`#name-${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;

  //console.log(elements.clearScores);
  elements.clearScores.forEach(element => (element.textContent = 0));

  //hide the dice
  elements.diceImg.classList.remove("show");

  //reset the scores storage var
  scores = [0, 0];

  isRunning = true;
};

//FUNCTION NEXTPLAYER()
const nextPlayer = () => {
  //before we change the activePlayer we toggle the class of the actualPlayer
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle("active");

  //we have to clean the roundScore otherwise the nextPlayer will start with the score of previous's player.
  roundScore = 0;

  //we have to clear the current score of the current player before change to the nextPlayer();

  document.querySelector(`#current-${activePlayer}`).textContent = 0;

  //let's hide the dice
  elements.diceImg.classList.remove("show");

  //now we define the next active player
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);

  //now that we already changed the ActivePlayer we can toogle the class
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.toggle("active");
};

//button roll dice

/** Steps
 * generate a random number between 1 and 6
 * update the user interface
 * check if the play won the game
 */

elements.btnRoll.addEventListener("click", () => {
  if (isRunning) {
    //generate a random number
    const diceNumber = randomNumber();

    //makes the dice image appears
    elements.diceImg.classList.add("show");

    //change de dice image to match the value of the random number
    elements.diceImg.src = `img/dice-${diceNumber}.png`;

    /**
     * If the dice is differ than 1, update the UI and roundScore value
     * else calll nextplayer function
     */
    if (diceNumber !== 1) {
      roundScore += diceNumber;

      //update the UI
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
    } else {
      //nextplayer
      nextPlayer();
    }
  }
});

//button hold

/** Steps
 * add the current score to the global score
 * update the user interface
 * check if the play won the game
 */
const btnHold = document.querySelector(`.btn-hold`);

btnHold.addEventListener("click", () => {
  if (isRunning) {
    const scoreHolder = document.querySelector(`#score-${activePlayer}`);
    const winnerPlayer = document.querySelector(`#name-${activePlayer}`);

    //adding the current score the global score.
    scores[activePlayer] += roundScore;
    //console.log(activePlayer);

    //updating the user interface;
    scoreHolder.textContent = scores[activePlayer];

    //check if the player won the game..
    if (scores[activePlayer] >= 30) {
      winnerPlayer.textContent = "Winner";
      isRunning = false;
    } else {
      nextPlayer();
    }
  }
});

//button new game
/**
 * call function newGame()
 * reset all the variables to default
 */
const btnNew = document.querySelector(`.btn-new`);
btnNew.addEventListener("click", resetGame);
