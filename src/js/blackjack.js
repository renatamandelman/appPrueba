const canvasDiv = document.getElementById("canvasDiv");
const crupierDiv = document.getElementById("crupier");
const playerDiv = document.getElementById("player");
const playerHand = document.getElementById("playerHand");
const pedirCarta = document.getElementById("pedirCarta");
const winner = document.getElementById("winner");
const dinero = document.querySelector("#dinero span");
const modal = document.getElementById("modalBJ");
const modalBg = document.getElementById("modalBackground");
const apuestaP = document.getElementById("apuesta");
const resultado = document.getElementById("resultado");

function board() {
  var canvasWidth = 400;
  var canvasHeight = 600;
  // var ctx = canvasDiv.getContext("2d");

  if (window.innerWidth <= 600) {
    canvasDiv.style.width = canvasWidth + "px";
    canvasDiv.style.height = canvasHeight + "px";
  } else if (window.innerWidth > 600) {
    canvasWidth = 600;
    canvasHeight = 300;
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
  let mensaje = `
	<p>Genera tu apuesta:</p>
	<input type="number" id="apuesta" name="apuesta"  />
	<button id="btnApuesta" class="button">Apuesta</button>
	<button id="btnNoApuesta" class="button">No apostar</button>
	`;
  mostrarModal(mensaje);
  document.getElementById("btnApuesta").addEventListener("click", () => {
    let apuesta = parseInt(document.getElementById("apuesta").value);
    console.log(apuesta);
    verificarDinero(apuesta);
  });
  document.getElementById("btnNoApuesta").addEventListener("click", () => {
    modal.classList.add("nodisp");
    modalBg.classList.add("nodisp");
  });
});
document.getElementById("plantar").addEventListener("click", () => {
  showCrupierCards();
  console.log("Total del crupier:", blackJack.totalCrupier);
  pedirCarta.setAttribute("disabled", "disabled");
  pedirCarta.classList.add("disable");
  setTimeout(() => { calculateWinner();}, 800)
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
	let mensaje;
  if (blackJack.totalPlayer > 21) {
	mensaje= `<h2>Perdiste</h2> 
	<p>El total de tu mano es ${blackJack.totalPlayer} y supera el lí
	mite de 21 puntos.</p>
	<button id="reiniciar" class="button">Reinciar</button>
	<button id="terminar" class="button">Terminar Juego</button>
`;
	mostrarModal(mensaje);
	document.getElementById("terminar").addEventListener("click", closeModal);
} else if (blackJack.totalCrupier > 21 && blackJack.totalPlayer < 21) {
	mensaje= `<h2>Ganaste</h2> 
	<p>El total de tu mano es ${blackJack.totalPlayer}</p>
	<button id="reiniciar" class="button">Reinciar</button>
	<button id="terminar" class="button">Terminar Juego</button>
`;
	mostrarModal(mensaje);
	document.getElementById("terminar").addEventListener("click", closeModal);  
} else if (
    blackJack.totalPlayer > blackJack.totalCrupier &&
    blackJack.totalPlayer <= 21
  ) {
	mensaje= `<h2>Ganaste</h2> 
	<p>El total de tu mano es ${blackJack.totalPlayer}</p>
	<button id="reiniciar" class="button">Reinciar</button>
	<button id="terminar" class="button">Terminar Juego</button>
`;
	mostrarModal(mensaje);
	document.getElementById("terminar").addEventListener("click", closeModal);  } else if (
    blackJack.totalCrupier > blackJack.totalPlayer &&
    blackJack.totalCrupier <= 21
  ) {
    mensaje= `<h2>Perdiste</h2> 
	<p>El total de tu mano es ${blackJack.totalPlayer} y supera el lí
	mite de 21 puntos.</p>
	<button id="reiniciar" class="button">Reinciar</button>
	<button id="terminar" class="button">Terminar Juego</button>
`;
	mostrarModal(mensaje);
	document.getElementById("terminar").addEventListener("click", closeModal);
  } else if (blackJack.totalPlayer === blackJack.totalCrupier) {
	mensaje= `<h2>Empate</h2> 
	<p>El total de tu mano es ${blackJack.totalPlayer} y supera el lí
	mite de 21 puntos.</p>
	<button id="reiniciar" class="button">Reinciar</button>
	<button id="terminar" class="button">Terminar Juego</button>
`;
	mostrarModal(mensaje);
	document.getElementById("terminar").addEventListener("click", closeModal);  }
}

function initGame() {
  // blackJack.apuesta = 0;
  apuestaP.innerHTML = blackJack.apuesta;
  dinero.innerHTML = blackJack.dineroPlayer;
  board();
  createCards();
  choseCards(blackJack.cardsPlayer, playerHand, playerDiv);
  console.log(blackJack.cardsPlayer);

  mostrarModalApuesta();
}

function mostrarModalApuesta() {
  let mensaje = `
	  <p>Cuanto deseas apostar en la primer ronda?</p>
	  <input type="number" id="apuesta" name="apuesta" min="1000" max="5000" />
	  <button id="btnApuesta" class="button">Apuesta</button>
	`;
  mostrarModal(mensaje);

  document.getElementById("btnApuesta").addEventListener("click", () => {
    let apuesta = parseInt(document.getElementById("apuesta").value);
    if (apuesta < 1000 || apuesta > 5000) {
      mostrarErrorApuesta();
    } else {
      realizarApuesta(apuesta);
    }
  });
}

function mostrarModal(mensaje) {
  modal.classList.remove("nodisp");
  modalBg.classList.remove("nodisp");
  modal.innerHTML = mensaje;
}

function ocultarModal() {
  modal.classList.add("nodisp");
  modalBg.classList.add("nodisp");
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
  ocultarModal();
}

function mostrarErrorApuesta() {
  let mensaje = `
	  <p>La apuesta máxima es 5000, ingresa un número menor</p>
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
    cardsTo.push(cardSeleccionada);
    if (cardsTo === blackJack.cardsPlayer) {
      drawBackCard(cardSeleccionada, hand, div); // Dibuja la carta con el reverso al principio
    } else {
      drawCard(cardSeleccionada, hand, div, true);
    }
    blackJack.totalPlayer = calculateTotal(cardsTo, "totalPlayer");
    console.log("Cartas del jugador:", cardsTo);
  }, i * 500);
}
function drawBackCard(cardSeleccionada, hand, div) {
  let img = document.createElement("img");
  img.setAttribute("src", document.getElementById("back").getAttribute("src")); // Ruta al SVG del reverso
  img.setAttribute("alt", "card-back");
  img.setAttribute("class", "imgCardPlayer card-back"); // Añadir clase para el estilo
  img.addEventListener("click", () => {
    flipCard(cardSeleccionada, img);
  }); // Agregar el evento de clic para voltear
  hand.appendChild(img);
  div.appendChild(hand);
}
function flipCard(cardSeleccionada, img) {
  img.setAttribute(
    "src",
    document
      .getElementById(`${cardSeleccionada.valor}${cardSeleccionada.palo}`)
      .getAttribute("src")
  ); // Cambiar la imagen a la parte delantera de la carta
  img.setAttribute("alt", `${cardSeleccionada.valor}${cardSeleccionada.palo}`); // Establecer un nuevo valor alt
  img.classList.add("flipped"); // Añadir una clase para animación
}

window.addEventListener("resize", board);

document.addEventListener("DOMContentLoaded", () => {
  initGame();
});
