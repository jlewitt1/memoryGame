
var body = document.getElementsByTagName("body")[0];
var memory_board = document.getElementById("memory_board");

var numCols = 6; 
var numRows = 4;

var cards = ['shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant','beach','deadSea','hermon',
			 'shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant','beach','deadSea','hermon'];

var DOMcards = document.getElementsByClassName("card");

shuffleCards(cards);
createCards();
setAttributes();

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

function setAttributes() { //setting name of each element in cards array
	for (var i=0; i<cards.length;i++) { 
		DOMcards[i].setAttribute('data-name',cards[i]);
	}
}

function shuffleCards (array) {  //randomly place each card on the grid
	for (var i = array.length - 1; i > 0; i--) { //randomly shuffle the cards array
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
    }
    temp = JSON.parse(JSON.stringify(cards)); //copying randomized array into original cards array  
}

var tempArray = []; //used to store cards that user clicks on

function changeBackground(event) {  //change image from temp image 
	var name = 	event.target.getAttribute("data-name");
	var id = event.target.getAttribute("id");
	event.target.style.backgroundImage = 'url(images/' + name + '.jpg)';
	tempArray.push(name);
	//console.log(tempArray);
	
		if (tempArray.length == 2) { //check if user has made a match 
			if (tempArray[0] == tempArray[1]) { 
				tempArray=[];
			}
			else { 
			changeImageBack(id); //if not a match change back to temp image
			}
		} 
	gameOverCheck(); //check if user has successfully matched all cards
}

function changeImageBack (picture_id) { //after clicking switch back to temp image
	var ImagetoChange = document.getElementById(picture_id);
	ImagetoChange.style.backgroundImage = 'url(images/temp.jpg)'; //change background of each card
}

setTimeout(changeImageBack,500); //set lag time after clicking on two pictures that don't match

function gameOverCheck () { //if user wins (i.e. no temp images remaining)
	for (var i=0; i<cards.length;i++) { 
		if (cards[i].style.backgroundImage != '/images/temp.jpg') { 
			alert ("Congrats - You win!");
			startNewGame(); // call function to display newGame button
		}
	}
}

function startNewGame () { //after previous game is finished show button to allow new game on click
	var newGame = document.createElement("button");
	memory_board.appendChild(newGame);
	newGame.innerHTML = "New Game!";
	Object.assign(newGame.style,{backgroundColor:"darkblue", borderColor:"lightgray", borderRadius:"6px", height:"60px", width:"80px",});
	
	newGame.addEventListener("click", function() { //onclick call cards function to start new game
	  createCards();
    });
}







