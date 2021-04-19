'use strict';

// players total score elements
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');

const player0Current = document.getElementById('current--0');
const player1Current = document.getElementById('current--1');

// Objects and other Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
player0Score.textContent = 0;
player1Score.textContent = 0;

let scores, currentScore, activePlayer, playingState;


const showDice = function() {
    diceEl.classList.remove('hidden')
}

const getPlayer = () => (activePlayer == 1)?player1Current:player0Current;

const switchPlayer = function (player) {
    player.textContent = 0;                 // set current player current score 0
    activePlayer = (activePlayer===0)?1:0;  // change the activate player
    currentScore = 0;                       // reset the current score
        
    player0.classList.toggle('player--active');     // toggle the opacity of both players
    player1.classList.toggle('player--active');
}

const rollingDice = () => Math.floor((Math.random() * 6))+1;

// on rolling a dice
rollBtn.addEventListener('click', function() {
    if (playingState) {
        const dice = rollingDice();
        diceEl.setAttribute('src',`dice-${dice}.png`);
        showDice();
        let player = getPlayer();
        if (dice !== 1) {
            currentScore += dice;     
            player.textContent = currentScore;      // changing the players content
        } else {
            switchPlayer(player)
        }
    }
    
});


holdBtn.addEventListener('click', function() {
    if (playingState) {
        // add current score to array of players element
        let player = getPlayer();
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // score more than or equal to 50 player wins
        if (scores[activePlayer] >= 50) {
            playingState = false;
            diceEl.classList.add('hidden')
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer(player);
        }
    }
});


newBtn.addEventListener('click', initializer);


function initializer() {
    playingState = true;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0]
    diceEl.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    player0Score.textContent = 0;
    player1Score.textContent = 0;
    player0Current.textContent = 0;
    player1Current.textContent = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
}


initializer();