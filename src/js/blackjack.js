const canvasDiv = document.getElementById("canvasDiv");
const crupierDiv = document.getElementById("crupier");
const playerDiv = document.getElementById("player");
const playerHand = document.getElementById("playerHand");
const pedirCarta = document.getElementById("pedirCarta");
const winner = document.getElementById("winner");
function board() {
var canvasWidth = 400;
var canvasHeight = 600;
// var ctx = canvasDiv.getContext("2d");

if (window.innerWidth <= 600) {
	canvasDiv.style.width = canvasWidth + "px";
	canvasDiv.style.height = canvasHeight + "px";
} else if (window.innerWidth > 600) {
	canvasWidth = 600 ;
	canvasHeight = 300;
	canvasDiv.style.width = canvasWidth + "px";
	canvasDiv.style.height = canvasHeight + "px";
  }
}
const blackJack = {
	card:{
		 x: 50,
		 y: 50
	},
	palos: ["P", "D", "C", "T"],
	cards:[],
	cardsPlayer:[],
	cardsCrupier: [],
	totalPlayer:0,
	totalCrupier:0,
	asValue:1,
} 




function createCards(){
for (let i = 0; i < blackJack.palos.length; i++) {
	for (let j = 1; j <= 13; j++) {
		blackJack.cards.push({
            valor: j,
            palo: blackJack.palos[i]
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
	img.setAttribute("src", document.getElementById(`${CJ.valor}${CJ.palo}`).getAttribute("src"));

	if (isAnimated) {
        // Agregar clase para la animación después de un pequeño retraso
        setTimeout(() => {
			img.classList.add("imgCard");
            img.classList.add("animateCard");
        }, 100); // Ajusta el tiempo según sea necesario
    } else{
		img.classList.add("imgCard");
	}
	hand.appendChild(img);
	div.appendChild(hand);
}
function showCrupierCards() {
    const crupierHand = document.getElementById("crupierHand");
	choseCards(blackJack.cardsCrupier, crupierHand, crupierDiv);
	crupierHand.innerHTML = "";
    blackJack.cardsCrupier.forEach((carta, index) => {
        setTimeout(() => {
            drawCard(carta, crupierHand, crupierDiv, true); // Animación activada
        }, index * 500); // Retardo entre cartas para un efecto secuencial
    });
	// blackJack.totalCrupier = calculateTotal(blackJack.cardsCrupier, "totalCrupier");

}

pedirCarta.addEventListener("click", () => {
	transitionCard(blackJack.cardsPlayer, playerHand, playerDiv)
	// blackJack.totalPlayer = calculateTotal(blackJack.cardsPlayer, "totalPlayer");


	// let carta = randomCard();
	// blackJack.cardsPlayer.push(carta);
	// drawBackCard(carta, playerHand, playerDiv);
});
document.getElementById("plantar").addEventListener("click", () => {
    showCrupierCards();
    console.log("Total del crupier:", blackJack.totalCrupier);
    pedirCarta.setAttribute("disabled", "disabled");
    pedirCarta.classList.add("disable");

    // Mostrar cartas del crupier con animación
    

    // if(blackJack.totalCrupier < 17) {
	// 	transitionCard(blackJack.cardsCrupier, document.getElementById("crupierHand"), crupierDiv);

    // }

});

function calculateTotal(cards, who) {
		let total = 0;
	  let as = 0;
	console.log(cards)
		for (let i = 0; i < cards.length; i++) {
		  let cardValue = cards[i].valor;
		
		  if (cardValue > 10) {
			cardValue = 10;
		  } else if (cardValue === 1){
			as++;
		  } 
		  console.log(`Valor de la carta: ${cards[i].valor}, Total parcial: ${total}`);

		  total += cardValue;
		}		 		  


	  
		// Si el total es mayor que 21 y hay ases, restamos 10 por cada as hasta que el total sea menor o igual a 21
		while (total > 21 && as) {
		  total -= 10;
		  as--;
		}
	  
		if (who === "totalPlayer") {
		  blackJack.totalPlayer = total;
		} else if (who === "totalCrupier") {
		  blackJack.totalCrupier = total;
		}
		console.log(`Total para ${who}:`, total);
		return total;
	  }
	 

function initGame() {
	board();
	createCards();
	choseCards(blackJack.cardsPlayer, playerHand, playerDiv);
	console.log(blackJack.cardsPlayer)
	
}

function choseCards(cardsTo, hand, div) {
    for (let i = 0; i < 2; i++) {
        transitionCard(cardsTo,hand,div, i);
		
    }
	
}
function transitionCard(cardsTo,hand,div, i){
	setTimeout(() => {
		const cardSeleccionada = randomCard();
		cardsTo.push(cardSeleccionada);
		if(cardsTo === blackJack.cardsPlayer){
		drawBackCard(cardSeleccionada,hand, div);  // Dibuja la carta con el reverso al principio
		} else{
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
    img.setAttribute("class", "imgCardPlayer card-back");  // Añadir clase para el estilo
	img.addEventListener("click", () => {flipCard(cardSeleccionada, img)});  // Agregar el evento de clic para voltear
	hand.appendChild(img);
	div.appendChild(hand); 

	
}
function flipCard(cardSeleccionada, img) {
img.setAttribute("src", document.getElementById(`${cardSeleccionada.valor}${cardSeleccionada.palo}`).getAttribute("src")); // Cambiar la imagen a la parte delantera de la carta
img.setAttribute("alt", `${cardSeleccionada.valor}${cardSeleccionada.palo}`);  // Establecer un nuevo valor alt
img.classList.add("flipped");  // Añadir una clase para animación
}

function modal(){
	const modal = document.getElementById("modalBJ");
	modal.classList.remove("nodisp");
	modal.innerHTML = `
	Obtuviste un as, que valor deseas asignarle?
	<a id="as1"  class="btnModal">1</a>
	<a id="as11" class="btnModal">11</a>
	`
	let currentValor;
	document.getElementById("as1").addEventListener("click", function(event) {
        event.preventDefault(); 
		modal.classList.add("nodisp");
    });

    document.getElementById("as11").addEventListener("click", function(event) {
        event.preventDefault(); 
		modal.classList.add("nodisp");
		blackJack.asValue = currentValor;
    });
	// for (let i = 0; i < blackJack.cardsPlayer.length; i++) {
	// 	if(blackJack.cardsPlayer[i].valor === 1 && currentValor === 11){
	// 		blackJack.cardsPlayer[i].valor = 11;

	// 	}
	// }
}
window.addEventListener("resize", board);

document.addEventListener("DOMContentLoaded", () => {
	initGame();
  });
//   modal();
//   cardValue = blackJack.asValue;
//   for (let i = 0; i < blackJack.cardsPlayer.length; i++) {
// 	  const cartaSeleccionada = blackJack.cardsPlayer[i] ;
// 	  if(cartaSeleccionada.valor === 1){
// 		  cartaSeleccionada.valor = cardValue;
// 	  }
// 	  if(cardValue = 11){
// 		  drawCard(cartaSeleccionada, playerHand, playerDiv);
// 	  }
	  
//   }