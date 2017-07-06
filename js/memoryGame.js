
var body = document.getElementsByTagName("body")[0];
var memory_board = document.getElementById("memory_board");

var numCols = 6; 
var numRows = 3;
var totalMatches;
var numClicks=0;
var newGame = document.createElement("button");
var results = document.createElement("span");

var cards = ['shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant',
			 'shakshuka', 'shwarma', 'falafel', 'schnitzel', 'goldstar', 'sabich', 'maccabi','hummus','eggplant'];

var DOMcards = document.getElementsByClassName("card");

gameStart();

function gameStart () { 
	//body.style.backgroundImage= "";
	body.style.backgroundImage = 'url(images/pattern.jpg)';
	body.style.backgroundRepeat = 'no-repeat';
	body.style.backgroundSize = 'cover';
	memory_board.innerHTML = ''; //re-set the board to allow for multiple games
	totalMatches = ((numCols * numRows) / 2);
	numClicks=0;
	//newGame.innerHTML = "";
	results.innerHTML = "";
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
		DOMcards[i].innerHTML = DOMcards[i].getAttribute('data-name'); //-->see answers if don't want to guess
	}
}

var tempArray = []; //used to store cards that user clicks on

function changeBackground(event) {  //change image from temp image
	if (tempArray.length < 4){
		var name = 	event.target.getAttribute("data-name");
		var id = event.target;
		event.target.style.backgroundImage = 'url(images/' + name + '.jpg)';
		numClicks++;
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
				checkGameOver();
			} else {  //if there is no match 
				setTimeout(function() { //set lag time after clicking on two pictures that don't match
					changeImageBack();
					tempArray=[];
				}, 1000)	
			}		
	} 
}

function changeImageBack () { //after clicking switch back to temp image
	tempArray[1].setAttribute('style',''); //change background of first card
	tempArray[3].setAttribute('style',''); //change background of second card
}

function checkGameOver () { //if game is over prompt user to start a new one
	if (totalMatches == 0) { 
		setTimeout(100);
		newGamePrompt();
	}
}

function newGamePrompt () { //after previous game is finished show button to allow new game on click
	body.style.backgroundImage = 'url("https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif")';
	body.style.backgroundRepeat = 'no-repeat';
	body.style.backgroundSize = 'cover';
	newGame.innerHTML = "New Game!";
	newGame.style.display = 'block';
	body.appendChild(newGame);
	results.innerHTML = "Number of guesses: " + (numClicks/2);
	body.appendChild(results);
	newGame.addEventListener('click',hideButton);
}

function hideButton () { //hide the button after it is clicked before new game begins
	newGame.style.display = 'none';
	gameStart();
}







