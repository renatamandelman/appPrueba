const canvasDiv = document.getElementById("canvasDiv");
const crupierDiv = document.getElementById("crupier");
const playerDiv = document.getElementById("player");
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


function drawCard(CJ, hand, div) {
	let img = document.createElement("img");
	img.setAttribute("width", "80px");
	img.setAttribute("height", "100px");
	img.setAttribute("alt", `${CJ.valor}${CJ.palo}`);
	// img.setAttribute("src", `./assets/imgs/cartas/10C.svg`);
	img.setAttribute("src", document.getElementById(`${CJ.valor}${CJ.palo}`).getAttribute("src"));
	img.classList.add("imgCard");
	hand.appendChild(img);
	div.appendChild(hand);
}

const playerHand = document.getElementById("playerHand");
const pedirCarta = document.getElementById("pedirCarta");
const winner = document.getElementById("winner");
pedirCarta.addEventListener("click", ()=> {
	let carta = randomCard();
	blackJack.cardsPlayer.push(carta);
	drawCard(carta, playerHand, playerDiv);
});
document.getElementById("plantar").addEventListener("click", ()=> {
	const crupierHand = document.getElementById("crupierHand");
	choseCards(blackJack.cardsCrupier, crupierHand, crupierDiv);
	blackJack.totalCrupier = calculateTotal(blackJack.cardsCrupier, "totalCrupier");
	console.log("Total del crupier:", blackJack.totalCrupier);  
	pedirCarta.setAttribute("disabled", "disabled")
	pedirCarta.classList.add("disable")

	});
function calculateTotal(cards, who) {
		let total = 0;
		// let aces = 0;
	  
		for (let i = 0; i < cards.length; i++) {
		  let cardValue = cards[i].valor;
	  
		  if (cardValue > 10) {
			cardValue = 10;
		  } else if (cardValue === 1 && who === "totalPlayer") {
			cardValue = modal();
		  }
	  
		  total += cardValue;
		}
	  
		// Si el total es mayor que 21 y hay ases, restamos 10 por cada as hasta que el total sea menor o igual a 21
		while (total > 21 && aces) {
		  total -= 10;
		  aces--;
		}
	  
		if (who === "totalPlayer") {
		  blackJack.totalPlayer = total;
		} else if (who === "totalCrupier") {
		  blackJack.totalCrupier = total;
		}
	  
		return total;
	  }

function initGame() {
	board();
	createCards();
	choseCards(blackJack.cardsPlayer, playerHand, playerDiv);
	blackJack.totalPlayer = calculateTotal(blackJack.cardsPlayer, "totalPlayer");
	console.log("Cartas del jugador:", blackJack.cardsPlayer);
}

function choseCards(cardsTo, hand, div){
	for (let i = 0; i < 2; i++) {
		const cardSeleccionada = randomCard();
		cardsTo.push(cardSeleccionada);
		drawCard(cardSeleccionada, hand, div);

		// if(hand === blackJack.crupierHand && cardSeleccionada.valor === 1){
		// 	if()
		// }
	}	

}

function modal(){
	const modal = document.getElementById("modalBJ");
	modal.classList.remove("nodisp");
	modal.innerHTML = `
	Obtuviste un as, que valor deseas asignarle?
	<a id="as1"  class="btnModal">1</a>
	<a id="as11" class="btnModal">11</a>
	`
	document.getElementById("as1").addEventListener("click", function(event) {
        event.preventDefault(); 
		modal.classList.add("nodisp");
        return 1;
    });

    document.getElementById("as11").addEventListener("click", function(event) {
        event.preventDefault(); 
		modal.classList.add("nodisp");
        return 11;
    });

}
window.addEventListener("resize", board);

document.addEventListener("DOMContentLoaded", () => {
	initGame();
  });
