const N = 9;
let contador = 0;
let casillas = ["", "", "", "", "", "", "", "", ""];
const backMain = document.getElementById("btn-g1-back");
const combinacionesGanadoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const section = document.getElementById("contenedor");
let turno = document.getElementById("turnojugador");
let h2 = document.querySelector("h2");


document.addEventListener("DOMContentLoaded", () => { initGame() });
function initGame() {
  backMain.setAttribute("disabled","disabled");
  backMain.classList.remove("backBtn");
  backMain.classList.add("disableReiniciar")
  turno.innerHTML = "";
  turno.innerHTML = "X";
  console.log(turno)
  casillas = ["", "", "", "", "", "", "", "", ""];
  table();
  deshabilitarBoton();
  console.log(casillas);
}

function deshabilitarBoton() {
  const reiniciar = document.getElementById("reiniciar");
  reiniciar.setAttribute("href", "javascript:tirarMoneda();");
  reiniciar.classList.remove("reiniciar");
  reiniciar.classList.add("disableReiniciarBoton");
}

function table() {
  section.innerHTML = "";
  for (let i = 0; i < N; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", function () {
      play(i);
      if(casillas[i] === "X"){
      div.innerHTML = `<svg class="xTurn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>`;
      div.classList.add("disable");
      } else if(casillas[i] === "O"){
        div.innerHTML = `<svg class="oTurn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 96C135.6 96 64 167.6 64 256s71.6 160 160 160s160-71.6 160-160s-71.6-160-160-160zM0 256C0 132.3 100.3 32 224 32s224 100.3 224 224s-100.3 224-224 224S0 379.7 0 256z"/></svg>`;
        div.classList.add("disable");
      }
      if (!winner() && contador == N) {
        h2.innerHTML = "Empate"
        habilitarBoton();
        backMain.removeAttribute("disabled", "disabled");
        backMain.classList.remove("disableReiniciar");
        backMain.classList.add("backBtn");
      } else if (winner()) {
        h2.innerHTML = `Ganó: <span id=${turno}>${casillas[i]}</span>`;
        habilitarBoton();
        backMain.removeAttribute("disabled", "disabled");
        backMain.classList.remove("disableReiniciar");
        backMain.classList.add("backBtn");
      }
    });
    section.appendChild(div);

  }
}

function habilitarBoton() {
  const reiniciar = document.getElementById("reiniciar");
  reiniciar.classList.remove("disableReiniciarBoton");
  reiniciar.classList.add("reiniciar");
  contador = 0;
  reiniciar.addEventListener("click", () => {
    tirarMoneda();
  })
  
}

function tirarMoneda() {
  h2.innerHTML = `Turno de: <span id='turnojugador'>${Math.random() > 0.5 ? 'X' : 'O'}</span>`;
}


function play(celda) {
  if(winner()){
   return;
  }
  console.log(turno);
  if (casillas[celda] == "" && turno.innerHTML == "X") {
    casillas[celda] = "X";
    console.log(casillas);
    turno.innerHTML = "O"
    contador += 1;
  } else if (casillas[celda] == "" && turno.innerHTML == "O") {
    casillas[celda] = "O";
    console.log(casillas);
    turno.innerHTML = "X";
    contador += 1;
  }

}

function winner() {
  for (let i = 0; i < combinacionesGanadoras.length; i++) {
    const combinacion = combinacionesGanadoras[i];
    const celda1 = casillas[combinacion[0]];
    const celda2 = casillas[combinacion[1]];
    const celda3 = casillas[combinacion[2]];
    if (celda1 !== "" && celda1 === celda2 && celda2 === celda3) {
      
      const cells = section.children;
      cells[combinacion[0]].classList.add("winner");
      cells[combinacion[1]].classList.add("winner");
      cells[combinacion[2]].classList.add("winner");
      
      Array.from(section.children).forEach(cell => cell.classList.add("disable"));

      return true;
    }
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {initGame()});