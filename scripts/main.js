// Audio
const start    = new Audio(`audio/start.mp3`);
const help     = new Audio(`audio/help.mp3`);
const diceRoll = new Audio(`audio/dice_roll.mp3`);
const lost     = new Audio(`audio/lost.mp3`);
const won      = new Audio(`audio/won.mp3`);

start.volume    = 0.1;
help.volume     = 0.2;
diceRoll.volume = 0.2;
lost.volume     = 0.2;
won.volume      = 0.2;

// PopUp help button
const $help = $(`#help`);

$help.hover(function(){
    help.play();
    $(`#instructions`).css(`display`, `block`);
}, function() {
    $(`#instructions`).css(`display`, `none`);
});

// Initial Landing Page
const $playerName = $(`#playerName`);
const $play       = $(`#play`);

$play.click(function(){
    if($playerName.val().length != 0) {
        $(`.userName`).text(`${$playerName.val()}`);
    }

    start.play();

    setTimeout(function(){
        $(`.startUp`).fadeOut(animationDelay);
    }, animationDelay);
});

const animationDelay = 500;
const $round = $(`#round`);

// Player Variables
const $playerDices        = $(`#playerDices`);
const $playerDiceImgs     = $(`#playerDices img`);
const $playerCurrentScore = $(`#playerCurrentScore`);
const $playerFinalScore   = $(`#playerFinalScore`);

// CPU Variables
const $cpuDices        = $(`#cpuDices`);
const $cpuDiceImgs     = $(`#cpuDices img`);
const $cpuCurrentScore = $(`#cpuCurrentScore`);
const $cpuFinalScore   = $(`#cpuFinalScore`);

const defaultDices = `images/dices/rolling-dices.png`;

const $roll    = $(`#roll`);
const $newGame = $(`#newGame`);
const $results = $(`#results`);

let finished     = false;
let currentRound = 1;
let currentRoll  = 1;
const finalRoll  = 3;

$roll.click(function(){
    if(!finished){
        roll();
    }
});

$newGame.click(function(){
    reset();
})

class Player {
    constructor() {
        this.currentScore = 0;
        this.finalScore   = 0;
    }

    updateCurrentScore( score ){
        this.currentScore = score;
    }

    updateFinalScore( score ){
        this.finalScore += score;
    }

    setFinalScore( score ) {
        this.finalScore = score;
    }

    rollPairOfDice (){
        const firstDice  = Math.floor(Math.random() * 6) + 1;
        const secondDice = Math.floor(Math.random() * 6) + 1;
    
        return [firstDice, secondDice];
    }
} 

// New User Objects
const user = new Player();
const cpu  = new Player();


/**
 * Rolls the dices and displays the scores of each players
 */
function roll(){
    diceRoll.play();

    if(currentRoll <= finalRoll){
        $round.text(currentRound);

        const userDices = user.rollPairOfDice();
        const cpuDices  = cpu.rollPairOfDice();

        user.updateCurrentScore(calculateScore(userDices));
        user.updateFinalScore(calculateScore(userDices));

        cpu.updateCurrentScore(calculateScore(cpuDices));
        cpu.updateFinalScore(calculateScore(cpuDices));

        $playerCurrentScore.text(`${user.currentScore}`);
        $playerFinalScore.text(`${user.finalScore}`);

        $cpuCurrentScore.text(`${cpu.currentScore}`);
        $cpuFinalScore.text(`${cpu.finalScore}`);

        $playerDiceImgs.each(function(img){
            $(this).attr(`src`, `images/dices/dice_${userDices[img]}.png`);
        })

        $cpuDiceImgs.each(function(img){
            $(this).attr(`src`, `images/dices/dice_${cpuDices[img]}.png`);
        })

        currentRound++;
        currentRoll++;
    } 

    if (finalRoll < currentRoll) {
        finished = true;
        if (user.finalScore > cpu.finalScore) {
            setTimeout(function(){
                $results.fadeTo(animationDelay,1)

                won.play();
                $(`#results h1`).text("You Win!");
                $(`#results img`).attr(`src`, `images/won.gif`);
            }, animationDelay);

        } else {
            setTimeout(function(){
                $results.fadeTo(animationDelay,1)

                lost.play();
                $(`#results h1`).text("You Lose!");
                $(`#results img`).attr(`src`, `images/lost.gif`);
            }, animationDelay);   
        }
    }
}

/**
 * Calculates the score of the given diceroll
 * @param {*} diceRolls user inputted array
 * @returns the score of the diceroll
 */
function calculateScore ( diceRolls = []){
    if(diceRolls[0] == 1 || diceRolls[1] == 1) {
        return 0;
    } else if(diceRolls[0] == diceRolls[1]) {
        return (diceRolls[0] + diceRolls[1]) * 2;
    } else {
        return diceRolls[0] + diceRolls[1];
    }
}

/**
 * Reset all the games parameters
 */
function reset(){
    currentRound = 1;
    currentRoll  = 1;

    user.setFinalScore(0);
    cpu.setFinalScore(0);

    $playerDiceImgs.each(function(img){
        $(this).attr(`src`, defaultDices);
    })

    $cpuDiceImgs.each(function(img){
        $(this).attr(`src`, defaultDices);
    })

    finished = false;
    $(`span`).text(0);
    $results.fadeOut(1000,0)
}
