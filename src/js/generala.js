const min = 1;
const max = 6;
const section = document.getElementById("boardGenerala");
const btnDados = document.getElementById("btnDados");
let dados;
let selectedDices;

const DICE_SIZE = 100;
const DOT_RADIUS = 0.1 * DICE_SIZE;
const AT_QUARTER = 0.25 * DICE_SIZE;
const AT_HALF = 0.5 * DICE_SIZE;
const AT_3QUARTER = 0.75 * DICE_SIZE;

const reEscalera = /12345|23456|13456/;
const reGenerala = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/;
const rePoker = /1{4}[23456]|12{4}|2{4}[3456]|[12]3{4}|3{4}[456]|[123]4{4}|4{4}[56]|[1234]5{4}|5{4}6|[12345]6{4}/;
const reFull = /1{3}(2{2}|3{2}|4{2}|5{2}|6{2})|1{2}(2{3}|3{3}|4{3}|5{3}|6{3})|2{3}(3{2}|4{2}|5{2}|6{2})|2{2}(3{3}|4{3}|5{3}|6{3})|3{3}(4{2}|5{2}|6{2})|3{2}(4{3}|5{3}|6{3})|4{3}(5{2}|6{2})|4{2}(5{3}|6{3})|5{3}6{2}|5{2}6{3}/;

const game= {
    dados: [0,0,0,0,0,0],
    selectedDices: [false, false, false, false, false],
    players:2,
    turn:1,
    moves:1,
    scores:[],
    round:1,
}

const isGameMatch = regex => {
    return game.dados.slice().sort((d1,d2) => d1-d2).join("").match(regex) !== null;
}

function initGame(){
    game.dados = [0, 0, 0, 0, 0];
    game.selectedDices = [false,false,false,false,false];
    game.turn = 1;
    game.moves = 1;
    for (let i = 0; i < game.players.length; i++) {
       game.scores.push(["","","","","","","","","","","","", 0]);
        
    }
    document.querySelectorAll("#boardGenerala .dice").forEach(diceElement => {
        diceElement.addEventListener("click",() => toggleDiceSelection(parseInt(diceElement.getAttribute("class").replace("dice d",""))));
    })
    tirarDados();
    drawState();
    drawTable();
    
}

function calculateScore(whichGame){
    const scoreGenerala = document.getElementById("generala-score");
    let score = 0;
    switch (whichGame) {
        case 6:
            if(isGameMatch(reEscalera)){
                score = game.moves === 1 ? 25 : 20;
                }
            break;
        case 7:
            if(isGameMatch(reFull)){
                score = game.moves === 1 ? 35 : 30;
                }
            break;
        case 8:
            if(isGameMatch(rePoker)){
                score = game.moves === 1 ? 45 : 40;
                }
            break;
        case 9: 
        if(isGameMatch(reGenerala)){
            score = game.moves === 1 ? 55 : 50;
            }
        break;
        case 10:
            if(isGameMatch(reGenerala)){
                score = game.moves === 1 ? 105 : 100;
                }
            break;
    
        default:
        score = game.dados.filter(dado => dado -1 === whichGame).reduce((acc,cur) => acc + cur,0);
            break;
    }

}

function drawScores(){
    //header
    const contHeader = document.querySelector("#g2 .scores table thead tr");
    contHeader.innerHTML = null;
    const cellGame = document.createElement("td");
    cellGame.innerHTML = "Juego";
    contHeader.appendChild(cellGame);
    for (let i = 0; i < game.players ; i++) {
    const cellPlayerName = document.createElement("th");
    cellPlayerName.innerHTML = `J${i + 1}`;// n la app, usar el nick del jugador que tengo guardado en el perfil
    contHeader.appendChild(cellPlayerName);
}
//fila para cada juego
const contGames = document.querySelector("#g2 .scores table tbody tr");
for (let i = 0; i < 11; i++) {
    const contGame = document.createElement("tr");
    const cellGameName = document.createElement("th")
    cellGameName.innerHTML = getGameName(i);
    contGames.appendChild(cellGameName);
    for (let p2 = 0; p2 < game.players; p2++) {
        cellPlayerScore.innerHTML = game.scores[p2][i];
        contGame.appendChild(cellPlayerScores);
    }
    contGames.appendChild(contGame);
    contGame.addEventListener("click", () => {
        if(game.dados.some(dice => dice === 0)){
        return;
        }
        console.info(`attempt to score on game ${getGameName(i)}`)
        if(game.scores[game.turn - 1][i] !== ""){
            alert(`ya se anoto el juego ${getGameName(i)}`);
            return;
        }else{
            const score = calculateScore(i);
            game.scores[game.turn - 1][i] = score === 0 ? "X" : score;
            game.scores[game.turn -1][11] += score;
            drawScores();
            changePlayerTurn();
        }

    })
}
const contTotal = document.createElement("tr");
    for (let p = 0; p < game.players; p++) {
    const cellTotalName = document.createElement("th");
    cellTotalName.innerHTML = "Total";
    contTotal.appendChild(cellTotalName);
    }
    document.querySelector("#g2 .scores table tbody").appendChild(contTotal)

}

const changePlayerTurn = () => {
    ame.dados = [0, 0, 0, 0, 0];
    game.selectedDices = [false,false,false,false,false];
    game.moves = 1;
    game.turn ++;
    if (game.turn > game.players){
        game.turn = 1;
        round ++;
        if(round == 11){
            gameOver();
        }
    }
    btnDados.removeAttribute("disabled");
    drawDices();
    drawState();

}
const gameOver = () =>{
    btnDados.setAttribute("disabled", "disabled");
    let winner = 0;
    let winningScore = 0;
    for (let i = 0; i < game.players; i++) {
       if(game.scores[i][11] >= winningScore){
        winningScore = game.scores[i][11];
        winner = i;
       }   
    }
    alert(`Winner: J${winner} won with ${winningScore} points`)
}

function showDice(diceElement, dado) {
    diceElement.innerHTML = null;
    let img = document.createElement( "img");
    img.setAttribute( "width", "" + DICE_SIZE); 
    img.setAttribute("height", "" + DICE_SIZE); 
    img.setAttribute("alt", `dice-${dado}`);
    img.setAttribute("src", document.getElementById(`d${dado}`).getAttribute("src" ));
    diceElement.appendChild(img) ;
}

function drawDados(){
    game.dados.forEach((dado, i) => {
        // document.querySelector(`#g2 #boardGenerala .dice.d${i}`).innerHTML = dado;
        const diceElement = document.querySelector(`#boardGenerala .dice.d${i}`);

        if(game.selectedDices[i]){
            diceElement.classList.add("selected");
        } else{
            diceElement.classList.remove("selected");
        }
        // diceElement.innerHTML = dice;
        showDice(diceElement, dado);
    
    })
}

function tirarDados(){
    for(let i = 0; i < game.dados.length; i++){
        if(game.moves === 1 || game.selectedDices[i]){
        game.dados[i] = Math.floor(Math.random() * 6) + 1;
        }
    }
    game.selectedDices = [false,false,false,false,false];
    drawDados();

    console. log('---');
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(whichGame => console.log(`Game ${getGameName(whichGame)} score: ${calculateScore(whichGame)}`))

    game.moves ++;
    if(game.moves > 3){
        btnDados.setAttribute("disabled", "disabled");   
    } else{
        drawState();
    }
    drawState();

   
}
const getGameName = whichGame => {
const games = ['1', '2', '3', '4', '5', '6', 'E', 'F', 'P', 'G', 'D'];
return games [whichGame];
}
const toggleDiceSelection = diceNumber => {
    game.selectedDices[diceNumber] = !game.selectedDices[diceNumber]; 
    const diceElement = document.querySelector(`#boardGenerala .dice.d${diceNumber}`)
    if(game.selectedDices[diceNumber]){
        diceElement.classList.add("selected");
    } else{
        diceElement.classList.remove("selected");
        }
    }

const drawState = () => {
    document.getElementById("generala-player").innerHTML = game.turn;
    document.getElementById("generala-moves").innerHTML = game.moves;
}


function randomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

document.addEventListener("DOMContentLoaded", () => { initGame() });
btnDados.addEventListener("click", () => { tirarDados() });






// function drawDot(ctx, x, y){
//     ctx.beginPath();
//     ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI, false);
//     ctx.fillStyle = "#000000";
//     ctx.fill();
//     ctx.closePath();
// }
 
// const showDice = (contDiv, number) => {
//     contDiv.innerHTML = null;
//     let canvas = document.createElement("canvas");
//     canvas.setAttribute("width", "" + DICE_SIZE);
//     canvas.setAttribute("height", "" + DICE_SIZE);
//     drawDice(canvas, number);
//     contDiv.appendChild(canvas);
// }
 
// const drawDice = (cont, number) => {
//     let ctx = cont.getContext("2d");
 
//     // Borro
//     ctx.clearRect(0, 0, DICE_SIZE, DICE_SIZE);
 
//     // Dado
//     ctx.beginPath();
//     ctx.rect(0, 0, DICE_SIZE, DICE_SIZE);
//     ctx.fillStyle = "#ffffff";
//     ctx.fill();
//     ctx.closePath();
 
//     switch (number) {
//         case 1:
//             drawDot(ctx, AT_HALF, AT_HALF);
//             break;
//         case 2:
//             drawDot(ctx, AT_3QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_3QUARTER);
//             break;
//         case 3:
//             drawDot(ctx, AT_HALF, AT_HALF);
//             drawDot(ctx, AT_3QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_3QUARTER);
//             break;
//         case 4:
//             drawDot(ctx, AT_3QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_3QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
//             break;
//         case 5:
//             drawDot(ctx, AT_HALF, AT_HALF);
//             drawDot(ctx, AT_3QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_3QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
//             break;
//         case 6:
//             drawDot(ctx, AT_3QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_3QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_QUARTER);
//             drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
//             drawDot(ctx, AT_QUARTER, AT_HALF);
//             drawDot(ctx, AT_3QUARTER, AT_HALF);
//     }
// }