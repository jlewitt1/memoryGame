
var body = document.getElementsByTagName("body")[0];
var memory_board = document.getElementById("memory_board");

var randNum = Math.floor(Math.random() * 6)+ 1; 

var numCols = 6; 
var numRows = 4;

var cards = ['shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant','beach','deadSea','hermon','shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant','beach','deadSea','hermon'];

function createCards(){ //create the memory board
	for (var i=0; i<numRows; i++) { 
		var row = document.createElement("div");
		row.className = "row";
		memory_board.appendChild(row);

		for (var j=0; j<numCols; j++){ 
		 var card = document.createElement("div");
		 card.className="card col-md-3";
		 row.appendChild(card);
		 card.addEventListener('click',changeBackground);
		}
	}
}

var DOMcards = document.getElementsByClassName("card");
function setAttributes() {
	for (var i=0; i<cards.length;i++) { 
		DOMcards[i].setAttribute('data-name',cards[i]);
	}
}

function changeBackground(event) {  //change image from temp image
	var name = 	event.target.getAttribute("data-name");
	event.target.style.backgroundImage = 'url(images/' + name + '.jpg)';
	event.target.backgroundSize = "cover";
	changeImageBack();
}

function changeImageBack () { //after clicking switch back to temp image
	card.style.backgroundImage = 'url(images/temp.jpg)';


}

function gameOver () { //if user wins



alert ("Congrats - You win!");
startNewGame(); // call function to display newGame button
}

function startNewGame () { 
	var newGame = document.createElement("button");
	memory_board.appendChild(newGame);
	newGame.innerHTML = "New Game!";
	Object.assign(newGame.style,{backgroundColor:"darkblue", borderColor:"lightgray", borderRadius:"6px", height:"60px", width:"80px",});
}

createCards();
setAttributes();
setTimeout(changeImageBack,500); //set lag time after clicking on two pictures that don't much




