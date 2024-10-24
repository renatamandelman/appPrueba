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

function initGame(){
    dados = [0, 0, 0, 0, 0];
    selectedDices = [false,false,false,false,false];
    document.querySelectorAll("#boardGenerala .dice").forEach(diceElement => {
        diceElement.addEventListener("click",() => toggleDiceSelection(parseInt(diceElement.getAttribute("class").replace("dice d",""))));
    })
    tirarDados();
}




function drawDot(ctx, x, y){
    ctx.beginPath();
    ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}
 
const showDice = (contDiv, number) => {
    contDiv.innerHTML = null;
    let canvas = document.createElement("canvas");
    canvas.setAttribute("width", "" + DICE_SIZE);
    canvas.setAttribute("height", "" + DICE_SIZE);
    drawDice(canvas, number);
    contDiv.appendChild(canvas);
}
 
const drawDice = (cont, number) => {
    let ctx = cont.getContext("2d");
 
    // Borro
    ctx.clearRect(0, 0, DICE_SIZE, DICE_SIZE);
 
    // Dado
    ctx.beginPath();
    ctx.rect(0, 0, DICE_SIZE, DICE_SIZE);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
 
    switch (number) {
        case 1:
            drawDot(ctx, AT_HALF, AT_HALF);
            break;
        case 2:
            drawDot(ctx, AT_3QUARTER, AT_QUARTER);
            drawDot(ctx, AT_QUARTER, AT_3QUARTER);
            break;
        case 3:
            drawDot(ctx, AT_HALF, AT_HALF);
            drawDot(ctx, AT_3QUARTER, AT_QUARTER);
            drawDot(ctx, AT_QUARTER, AT_3QUARTER);
            break;
        case 4:
            drawDot(ctx, AT_3QUARTER, AT_QUARTER);
            drawDot(ctx, AT_QUARTER, AT_3QUARTER);
            drawDot(ctx, AT_QUARTER, AT_QUARTER);
            drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
            break;
        case 5:
            drawDot(ctx, AT_HALF, AT_HALF);
            drawDot(ctx, AT_3QUARTER, AT_QUARTER);
            drawDot(ctx, AT_QUARTER, AT_3QUARTER);
            drawDot(ctx, AT_QUARTER, AT_QUARTER);
            drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
            break;
        case 6:
            drawDot(ctx, AT_3QUARTER, AT_QUARTER);
            drawDot(ctx, AT_QUARTER, AT_3QUARTER);
            drawDot(ctx, AT_QUARTER, AT_QUARTER);
            drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
            drawDot(ctx, AT_QUARTER, AT_HALF);
            drawDot(ctx, AT_3QUARTER, AT_HALF);
    }
}





function drawDados(){
    dados.forEach((dado, i) => {
        // document.querySelector(`#g2 #boardGenerala .dice.d${i}`).innerHTML = dado;
        const diceElement = document.querySelector(`#boardGenerala .dice.d${i}`);

        if(selectedDices[i]){
            diceElement.classList.add("selected");
        } else{
            diceElement.classList.remove("selected");
        }
        // diceElement.innerHTML = dice;
        showDice(diceElement, dado);
    
    })
}

function tirarDados(){
    for(let i = 0; i < dados.length; i++){
        if(selectedDices[i]){
        dados[i] = Math.floor(Math.random() * 6) + 1;
        console.log(dados[i])
        }
    }
    selectedDices = [false,false,false,false,false];
    drawDados();
}
const toggleDiceSelection = diceNumber => {
    selectedDices[diceNumber] = !selectedDices[diceNumber]; 
    const diceElement = document.querySelector(`#boardGenerala .dice.d${diceNumber}`)
    if(selectedDices[diceNumber]){
        diceElement.classList.add("selected");
    } else{
        diceElement.classList.remove("selected");
        }
    }




function randomNumber(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

document.addEventListener("DOMContentLoaded", () => { initGame() });
btnDados.addEventListener("click", () => { tirarDados() });

