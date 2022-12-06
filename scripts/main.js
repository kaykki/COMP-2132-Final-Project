const $playerName = $(`#playerName`);
const $play = $(`#play`);

const $round = $(`#round`);

const $playerDices        = $(`#playerDices`);
const $playerDiceImgs     = $(`#playerDices img`);
const $playerCurrentScore = $(`#playerCurrentScore`);
const $playerFinalScore   = $(`#playerFinalScore`);

const $cpuDices        = $(`#cpuDices`);
const $cpuDiceImgs     = $(`#cpuDices img`);
const $cpuCurrentScore = $(`#cpuCurrentScore`);
const $cpuFinalScore   = $(`#cpuFinalScore`);

const defaultDices = `images/dices/rolling-dices.png`;

const $roll    = $(`#roll`);
const $newGame = $(`#newGame`);
const $results = $(`#results`);

let finished = false;
let currentRound = 1;
let currentRoll  = 1;
const finalRoll  = 3;

let playerFinalScore = 0;
let cpuFinalScore    = 0;

$play.click(function(){
    $(`.startUp`).fadeOut(2000, 0)
});

$roll.click(function(){
    if(!finished){
        roll();
    }
});
$newGame.click(function(){
    returnDefault();
})

function roll(){
    if(currentRoll <= finalRoll){
        const player = rollPairOfDice();
        const cpu    = rollPairOfDice();
        
        $round.text(currentRound);

        $playerDiceImgs.each(function(img){

            $(this).attr(`src`, `images/dices/dice_${player[img]}.png`);
        })

        $cpuDiceImgs.each(function(img){

            $(this).attr(`src`, `images/dices/dice_${cpu[img]}.png`);
        })

        playerFinalScore += calculateScore(player);
        cpuFinalScore    += calculateScore(cpu);

        $playerCurrentScore.text(`${calculateScore(player)}`);
        $playerFinalScore.text(`${playerFinalScore}`);

        $cpuCurrentScore.text(`${calculateScore(cpu)}`);
        $cpuFinalScore.text(`${cpuFinalScore}`);


        currentRound++;
        currentRoll++;
    } 

    if (finalRoll < currentRoll) {
        finished = true;
        if (playerFinalScore > cpuFinalScore) {
            $results.fadeTo(2000,1)

            $(`#results h1`).text("You Win!");
            $(`#results img`).attr(`src`, `images/won.gif`);

        } else {
            $results.fadeTo(2000,1)

            $(`#results h1`).text("You Lose!");
            $(`#results img`).attr(`src`, `images/lost.gif`);
        }
    }
}


/**
 * Rolls a pair of dices
 * @returns an array that contains 2 random integers 1 -> 6
 */
function rollPairOfDice (){
    const firstDice  = Math.floor(Math.random() * 6) + 1;
    const secondDice = Math.floor(Math.random() * 6) + 1;

    return [firstDice, secondDice];
}

/**
 * Calculates the score of the given diceroll
 * @param {*} diceRolls 
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
 * Return all the games parameters to default
 */
function returnDefault(){
    currentRound = 1;
    currentRoll = 1;
    playerFinalScore = 0;
    cpuFinalScore    = 0;
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


