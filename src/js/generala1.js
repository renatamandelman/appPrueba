const min = 1;
const max = 6;
// let dados = ["","","","",""];
const section = document.getElementById("boardGenerala");
const buttonDados = document.getElementById("tirarDados");
// const btnDados = document.getElementById("btnDados");
let dados;

function initGame(){
    dados = [0, 0, 0, 0, 0];
    createDados();
}
buttonDados.addEventListener("click", () => { initGame() });


function createDados() {
    section.innerHTML = "";
    for (let i = 0; i < dados.length; i++) {
        drawDices();
    console.log(dados)
      const div = document.createElement("div");
      div.innerHTML = dados[i];
      section.appendChild(div);
    }
  }
  function drawDices() {
    section.innerHTML = ""; // Limpiar el contenido anterior
    for (let i = 0; i < dados.length; i++) {
        const div = document.createElement("div");
        div.innerHTML = dados[i];
        section.appendChild(div);
    }
}
function drawDices(){
    dados[i] = Math.floor((Math.random() * max) + min);
}
// function drawDados(){
//     dados.forEach((dado, i) => {
//         document.querySelector(`#g2 #boardGenerala.dice.d${i}`).innerHTML = dado;
//     })
// }

// function tirarDados(){
//     for(let i = 0; i < 5; i++){
//         dados[i] = randomNumber(min, max);
//     }
//     drawDados();
// }

// function randomNumber(minimum, maximum) {
//     return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
// }

// document.addEventListener("DOMContentLoaded", () => { initGame() });
