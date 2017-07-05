
var body = document.getElementsByTagName("body")[0];
var memory_board = document.getElementById("memory_board");

var numCols = 6; 
var numRows = 3;
var totalMatches;

var cards = ['shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant',
			 'shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant'];

var DOMcards = document.getElementsByClassName("card");

gameStart();

function gameStart () { 
	memory_board.innerHTML = ''; //re-set the board to allow for multiple games
	totalMatches = ((numCols * numRows) / 2);
	shuffleCards(cards);
	createCards();
	setAttributes();
}

function shuffleCards (array) {  //randomly place each card in the memory board
	for (var i = array.length - 1; i > 0; i--) { //randomly shuffle the array
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
    }
    temp = JSON.parse(JSON.stringify(cards)); //copying randomized array into original cards array  
}

function createCards() { //create the memory board
	for (var i=0; i<numRows; i++) { 
		var row = document.createElement("div");
		row.className = "row";
		memory_board.appendChild(row);

		for (var j=0; j<numCols; j++){ //create the cards
		 var cardContainer = document.createElement("div");
		 cardContainer.className = "col-md-2 col-sm-4 col-xs-6"; //add bootstrap for responsiveness
		 var card = document.createElement("div");
		 card.className = "card"; 
		 row.appendChild(cardContainer);
		 cardContainer.appendChild(card);
		 card.addEventListener('click',changeBackground);
		}
	}
}

function setAttributes() { //setting name of each element in cards array
	for (var i=0; i<cards.length;i++) { 
		DOMcards[i].setAttribute('data-name',cards[i]);
		DOMcards[i].innerHTML = DOMcards[i].getAttribute('data-name');
	}
}

var tempArray = []; //used to store cards that user clicks on

function changeBackground(event) {  //change image from temp image
	if (tempArray.length < 4){
		var name = 	event.target.getAttribute("data-name");
		var id = event.target;
		event.target.style.backgroundImage = 'url(images/' + name + '.jpg)';
		event.target.style.pointerEvents = 'none';
		tempArray.push(name);
		tempArray.push(id);
		finalCheck();
	}
}

function finalCheck () { //determine whether there is a match
	if (tempArray.length == 4) {
			if (tempArray[0] == tempArray[2]) {  //if there is a match
				tempArray=[];
				totalMatches--;
				//console.log(totalMatches);
				checkGameOver();
			} else {  //if there is no match 
				setTimeout(function() { //set lag time after clicking on two pictures that don't match
					changeImageBack();
					tempArray=[];

				}, 1200)	
			}		
	} 
}

function changeImageBack () { //after clicking switch back to temp image
	tempArray[1].setAttribute('style',''); //change background of first card
	tempArray[3].setAttribute('style',''); //change background of second card
}

function checkGameOver () { //if game is over prompt user to start a new one
	if (totalMatches == 0) { 
		setTimeout(function(){alert("Congratulations you won!")},100);
		newGamePrompt();
	}
}

function newGamePrompt () { //after previous game is finished show button to allow new game on click
	var newGame = document.createElement("button");
	newGame.innerHTML = "New Game!";
	body.appendChild(newGame);
	newGame.addEventListener('click',gameStart);
}







