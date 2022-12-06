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

let   currentRoll = 1;
const finalRoll   = 3;

let playerFinalScore = 0;
let cpuFinalScore    = 0;


$roll.click(function(){
    if(currentRoll <= finalRoll){

        const player = rollPairOfDice();
        const cpu    = rollPairOfDice();
        
        $playerDiceImgs.each(function(img){

            $(this).attr(`src`, displayDice(player[img]));
        })

        $cpuDiceImgs.each(function(img){

            $(this).attr(`src`, displayDice(cpu[img]));
        })

        playerFinalScore += calculateScore(player);
        cpuFinalScore    += calculateScore(cpu);

        $playerCurrentScore.text(`${calculateScore(player)}`);
        $playerFinalScore.text(`${playerFinalScore}`);

        $cpuCurrentScore.text(`${calculateScore(cpu)}`);
        $cpuFinalScore.text(`${cpuFinalScore}`);



        currentRoll++;
    }
});

$newGame.click(function(){
    returnDefault();
})


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
 * Generates an img element for the desired dice
 * @param {*} dice 
 * @returns img element of the desired dice
 */
function displayDice ( dice = 0) {
    return `images/dices/dice_${dice}.png`
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
    currentRoll = 1;
    $playerDiceImgs.each(function(img){

        $(this).attr(`src`, defaultDices);
    })

    $cpuDiceImgs.each(function(img){

        $(this).attr(`src`, defaultDices);
    })

    $(`span`).text(0);


}


