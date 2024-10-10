const N = 9;
let contador = 0;


let casillas = ["", "", "", "", "", "", "", "", ""];
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
  turno.innerHTML = 'X';
  console.log(turno)
  casillas = ["", "", "", "", "", "", "", "", ""];
  table();
  deshabilitarBoton();
  console.log(casillas);
}

function deshabilitarBoton() {
  const reiniciar = document.getElementById("reiniciar");
  reiniciar.setAttribute("href", "javascript:tirarMoneda();");
  reiniciar.classList.add("disable");
}

function table() {
  section.innerHTML = "";
  for (let i = 0; i < N; i++) {
    const div = document.createElement("div");
    div.addEventListener("click", function () {
      play(i);
      div.innerHTML = casillas[i];
      div.classList.add("disable");
      if (!winner() && contador == N) {
        h2.innerHTML = "Empate"
        habilitarBoton();
      } else if (winner()) {
        h2.innerHTML = `Ganó: <span id=${turno}>${casillas[i]}</span>`;

        habilitarBoton();
      }
    });
    section.appendChild(div);

  }
}

function habilitarBoton() {
  const reiniciar = document.getElementById("reiniciar");
  reiniciar.setAttribute("href", "javascript:tirarMoneda();");
  reiniciar.classList.remove("disable");
  contador = 0;
}

function tirarMoneda() {
  h2.innerHTML = `Turno de: <span id='turnojugador'>${Math.random() > 0.5 ? 'X' : 'O'}</span>`;
  turno = document.getElementById("turnojugador");
  initGame();
}

//Return te va a devolver el argumento que le asignes.

function play(celda) {
  if(winner()){
    return;
  }
  console.log(turno);
  if (casillas[celda] == "" && turno.innerHTML == "X") {
    casillas[celda] = "X";
    console.log(casillas);
    turno.innerHTML = "O";
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