const canvasDiv = document.getElementById("canvasDiv");
const crupierDiv = document.getElementById("crupier");
const playerDiv = document.getElementById("player");
const playerHand = document.getElementById("playerHand");
const pedirCarta = document.getElementById("pedirCarta");
const winner = document.getElementById("winner");
const dinero = document.querySelector("#dinero span");
const modal = document.getElementById("modalBJ");
const modalBg = document.querySelector("#g3 .centered .modal-bg");
const apuestaP = document.getElementById("apuesta");
const resultado = document.getElementById("resultado");



function board() {
  var canvasWidth = 400;
  var canvasHeight = 600;

  if (window.innerWidth <= 600) {
    canvasDiv.style.width = canvasWidth + "px";
    canvasDiv.style.height = canvasHeight + "px";
  } else if (window.innerWidth > 600 && window.innerWidth < 1000) {
    canvasWidth = 600;
    canvasHeight = 300;
    canvasDiv.style.width = canvasWidth + "px";
    canvasDiv.style.height = canvasHeight + "px";
  } else if(window.innerWidth > 1000){
    canvasWidth = 700;
    canvasHeight = 400;
    canvasDiv.style.width = canvasWidth + "px";
    canvasDiv.style.height = canvasHeight + "px";
  }
}
const blackJack = {
  card: {
    x: 50,
    y: 50,
  },
  palos: ["P", "D", "C", "T"],
  cards: [],
  cardsPlayer: [],
  cardsCrupier: [],
  totalPlayer: 0,
  totalCrupier: 0,
  asValue: 1,
  dineroPlayer: 5000,
  apuesta: 0,
};

function createCards() {
  blackJack.cards =[];
  for (let i = 0; i < blackJack.palos.length; i++) {
    for (let j = 1; j <= 13; j++) {
      blackJack.cards.push({
        valor: j,
        palo: blackJack.palos[i],
      });
    }
  }
  console.log(blackJack.cards);
}
function randomCard() {
  const cardRandom = Math.floor(Math.random() * blackJack.cards.length);
  const cardSeleccionada = blackJack.cards[cardRandom];
  blackJack.cards.splice(cardRandom, 1); // Elimina la card seleccionada del array
  return cardSeleccionada;
}

function drawCard(CJ, hand, div, isAnimated = false) {
  let img = document.createElement("img");
  img.setAttribute("width", "80px");
  img.setAttribute("height", "100px");
  img.setAttribute("alt", `${CJ.valor}${CJ.palo}`);
  img.setAttribute(
    "src",
    document.getElementById(`${CJ.valor}${CJ.palo}`).getAttribute("src")
  );

  if (isAnimated) {
    // Agregar clase para la animación después de un pequeño retraso
    setTimeout(() => {
      img.classList.add("imgCard");
      img.classList.add("animateCard");
    }, 100); // Ajusta el tiempo según sea necesario
  } else {
    img.classList.add("imgCard");
  }
  hand.appendChild(img);
  div.appendChild(hand);
}
function showCrupierCards() {
  const crupierHand = document.getElementById("crupierHand");
  choseCards(blackJack.cardsCrupier, crupierHand, crupierDiv);
  crupierHand.innerHTML = "";

  if (blackJack.totalCrupier < 17) {
    transitionCard(
      blackJack.cardsCrupier,
      document.getElementById("crupierHand"),
      crupierDiv
    );
  }
}

pedirCarta.addEventListener("click", () => {
  transitionCard(blackJack.cardsPlayer, playerHand, playerDiv);
  setTimeout(() => {
    let mensaje = `
	<p>Genera tu apuesta:</p>
	<input type="number" id="apuesta" name="apuesta"  />
  <div id="modalWinner">
	<button id="btnApuesta" class="button">Apuesta</button>
	<button id="btnNoApuesta" class="button">No apostar</button>
  </div>
	`;
  mostrarModal(mensaje);
  document.getElementById("btnApuesta").addEventListener("click", () => {
    let apuesta = parseInt(document.getElementById("apuesta").value);
    console.log(apuesta);
    verificarDinero(apuesta);
  });
  document.getElementById("btnNoApuesta").addEventListener("click", () => {
    closeModal();
  });
  }, 2000);
});
document.getElementById("plantar").addEventListener("click", () => {
  showCrupierCards();
  console.log("Total del crupier:", blackJack.totalCrupier);
  pedirCarta.setAttribute("disabled", "disabled");
  pedirCarta.classList.add("buttonDisabled");
  setTimeout(() => { calculateWinner();}, 2000)
});

function verificarDinero(apuesta) {
  console.log(blackJack.dineroPlayer);
  if (apuesta > blackJack.dineroPlayer) {
    let mensaje = `
			<p>No tienes esa cantidad de dinero, ingresa un valor valido :</p>
			<input type="number" id="apuestaNueva" name="apuesta"  />
			<button id="btnApuesta" class="button">Apuesta</button>
			<button id="btnNoApuesta" class="button">No apostar</button>
			`;
    mostrarModal(mensaje);
    document.getElementById("btnApuesta").addEventListener("click", () => {
      apuesta = parseInt(document.getElementById("apuestaNueva").value);
      verificarDinero(apuesta);
    });
  } else {
    realizarApuesta(apuesta);
    closeModal();
  }
}
function calculateTotal(cards, who) {
  let total = 0;
  let as = 0;
  console.log(cards);
  for (let i = 0; i < cards.length; i++) {
    let cardValue = cards[i].valor;

    if (cardValue > 10) {
      cardValue = 10;
    } else if (cardValue === 1) {
      as++;
    }
    console.log(
      `Valor de la carta: ${cards[i].valor}, Total parcial: ${total}`
    );

    total += cardValue;
  }

  if (total > 21 && as && who === "totalCrupier") {
    total -= 10;
    as--;
  }

  if (who === "totalPlayer") {
    blackJack.totalPlayer = total;
  } else  {
    blackJack.totalCrupier = total;
  }
  console.log(`Total para ${who}:`, total);
  return total;
}
function calculateWinner() {
  if( (blackJack.totalPlayer > 21) || (
    blackJack.totalCrupier > blackJack.totalPlayer &&
    blackJack.totalCrupier <= 21
  ) ) {
    modalWinner("Perdiste");

} else if ((blackJack.totalCrupier > 21 && blackJack.totalPlayer < 21)||(
  blackJack.totalPlayer > blackJack.totalCrupier &&
  blackJack.totalPlayer <= 21
)) {
  modalWinner("Ganaste");
}  else if (blackJack.totalPlayer === blackJack.totalCrupier) {
	modalWinner("Empate");
}
}
function modalWinner(result){
  let mensaje =`<h2>${result}</h2> 
	<p>El total de tu mano es ${blackJack.totalPlayer}</p>
  <p>El total del crupier es ${blackJack.totalCrupier}</p>
	<div id="modalWinner">
  <button id="continuar" class="button">Continuar jugando</button>
	<button id="retirar" class="button retirar">Retirarme</button>
  </div>
`;
mostrarModal(mensaje);
document.getElementById("retirar").addEventListener("click", () => { closeModal(); initGame()});  

document.getElementById("continuar").addEventListener("click", () => {closeModal();

if(result == "Perdiste"){
    // blackJack.dineroPlayer -= blackJack.apuesta;
    if(blackJack.dineroPlayer > 0){
      dinero.innerHTML = blackJack.dineroPlayer;
      blackJack.apuesta = 0;
      reiniciar();
    } else{
      dinero.innerHTML = 0;
      mensaje = `
      <p>Te quedaste sin dinero, puedes retirarte o ingresar dinero</p>
      	<div id="modalWinner">
	      <input type="number" id="apuesta" name="apuesta" min="1000" max="5000" />
        	<button id="ingresar" class="button">Ingresar</button>
        <button id="retirar"  class="button retirar">Retirarme</button>
        </div>
      `
      mostrarModal(mensaje);
      document.getElementById("ingresar").addEventListener("click", () => {
        closeModal();
        blackJack.dineroPlayer = parseInt(document.getElementById("apuesta").value);
        dinero.innerHTML = blackJack.dineroPlayer;
        reiniciar();
        });
    }
    } else if(result == "Ganaste"){
      blackJack.dineroPlayer += blackJack.apuesta * 2;
      dinero.innerHTML = blackJack.dineroPlayer;
      reiniciar();
    } else if(result == "Empate"){
      blackJack.dineroPlayer += blackJack.apuesta;
      dinero.innerHTML = blackJack.dineroPlayer;
      reiniciar();
    }
  });
}

function initGame() {
  blackJack.dineroPlayer = 5000;
  reiniciar();
  console.log(blackJack.cardsPlayer);
}

function reiniciar(){
  pedirCarta.removeAttribute("disabled", "disabled");
  pedirCarta.classList.remove("disable");
  blackJack.apuesta = 0;
  blackJack.totalPlayer = 0;
  blackJack.totalCrupier = 0;
  blackJack.as = 0;
  blackJack.cardsPlayer = [];
  blackJack.cardsCrupier = [];
  playerHand.innerHTML = "";
  crupierHand.innerHTML = "";
  apuestaP.innerHTML = blackJack.apuesta;
  dinero.innerHTML = blackJack.dineroPlayer;
  board();
  createCards();
  choseCards(blackJack.cardsPlayer, playerHand, playerDiv);
  primerApuesta();
 

}
function primerApuesta() {
  setTimeout(() => {

  let mensaje = `
	  <p>Cuanto deseas apostar en la primer ronda?</p>
	  <input type="number" id="apuesta" name="apuesta" min="1000" max="5000" />
	  <button id="btnApuesta" class="button">Apuesta</button>
	`;
  mostrarModal(mensaje);

  document.getElementById("btnApuesta").addEventListener("click", () => {
    let apuesta = parseInt(document.getElementById("apuesta").value);
    if (apuesta < 1000 || apuesta > 5000 || !apuesta) {
      mostrarErrorApuesta();
    } else {
      realizarApuesta(apuesta);
      closeModal()
    }
  });
}, 3000);
}

function mostrarModal(mensaje) { 
  console.log(modalBg) 
  modalBg.style.display = "flex";
  modal.classList.remove("nodisp");

  modal.innerHTML = mensaje;
}

function closeModal() {
  modalBg.style.display = "none";
  modal.classList.add("nodisp");
}

function realizarApuesta(apuesta) {
  console.log(apuesta);
  if (blackJack.apuesta == 0) {
    blackJack.apuesta = apuesta;
  } else {
    blackJack.apuesta += apuesta;
  }
  blackJack.dineroPlayer -= apuesta;
  dinero.innerHTML = blackJack.dineroPlayer;
  apuestaP.innerHTML = blackJack.apuesta;
}

function mostrarErrorApuesta() {
  let mensaje = `
	  <p>La apuesta minima es 1000 y la apuesta máxima es 5000</p>
	  <input type="number" id="apuesta" name="apuesta" min="1000" max="5000" />
	  <button id="btnApuestaRetry" class="button">Volver a intentarlo</button>
	`;
  mostrarModal(mensaje);

  document.getElementById("btnApuestaRetry").addEventListener("click", () => {
    blackJack.apuesta = parseInt(document.getElementById("apuesta").value);
    if (blackJack.apuesta < 1000 || blackJack.apuesta > 5000) {
      mostrarErrorApuesta();
    } else {
      realizarApuesta(blackJack.apuesta);
      closeModal()

    }
  });
}

function choseCards(cardsTo, hand, div) {
  for (let i = 0; i < 2; i++) {
    transitionCard(cardsTo, hand, div, i);
  }
}
function transitionCard(cardsTo, hand, div, i) {
  setTimeout(() => {
    const cardSeleccionada = randomCard();
    console.log("valor" + cardSeleccionada.valor)
    if(cardsTo === blackJack.cardsPlayer && cardSeleccionada.valor === 1){
      let mensaje = `
      <p>Te toco un As, deseas elegirlo como 1 o 11?</p>
      <div class="modalWinner">
      <button class="button" id="as">1</button>
      <button class="button" id="11">11</button>
      </div>
      `
      mostrarModal(mensaje);
      document.getElementById("as").addEventListener("click", () =>{
        cardSeleccionada.valor = 1;
        primerApuesta();
        closeModal();
      });
      document.getElementById("11").addEventListener("click", () =>{
        cardSeleccionada.valor = 11;
        primerApuesta();
        closeModal();
      });
    }
    cardsTo.push(cardSeleccionada);
    console.log(cardsTo)
    if (cardsTo === blackJack.cardsPlayer) {
      drawBackCard(cardSeleccionada, hand, div); // Dibuja la carta con el reverso al principio
        blackJack.totalPlayer = calculateTotal(blackJack.cardsPlayer, "totalPlayer");
    } else {
      drawCard(cardSeleccionada, hand, div, true);
      blackJack.totalCrupier = calculateTotal(blackJack.cardsCrupier, "totalCrupier");
    }
    console.log("Cartas del jugador:", cardsTo);
  }, i * 500);
}
function drawBackCard(cardSeleccionada, hand, div) {
  let img = document.createElement("img");
  img.setAttribute("src", document.getElementById("back").getAttribute("src")); 
  img.setAttribute("alt", "card-back");
  img.setAttribute("class", "imgCardPlayer card-back"); 
  img.addEventListener("click", () => {
    flipCard(cardSeleccionada, img);
  }); 
  hand.appendChild(img);
  div.appendChild(hand);
}
function flipCard(cardSeleccionada, img) {
  img.setAttribute(
    "src",
    document
      .getElementById(`${cardSeleccionada.valor}${cardSeleccionada.palo}`)
      .getAttribute("src")
  ); 
  img.setAttribute("alt", `${cardSeleccionada.valor}${cardSeleccionada.palo}`); 
  img.classList.add("flipped"); 
}

window.addEventListener("resize", board);

document.addEventListener("DOMContentLoaded", () => {
  initGame();
});
document.getElementById("retirar").addEventListener("click", () => {closeModal(); initGame()});
// document.getElementById("btn-g3-back").addEventListener("click", () => [
//   reiniciar()
// ])