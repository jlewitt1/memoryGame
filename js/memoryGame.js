
var numClicks = 0;
var firstChoice;
var secondChoice;

var numGames =0;
var tempCard = './images/temp.jpg';

var cards = [ 
	{
		name: "shakshuka",
		img: './images/shakshuka.jpg',
		id: 1,
	},

	{
		name: "falafel",
		img: './images/falafel.jpg',
		id: 2,
	},

	{
		name: "sabich",
		img: './images/sabich.jpg',
		id:3,
	},

	{
		name: "shwarma",
		img: './images/shwarma.jpg',
		id:4,
	},

	{ 
		name: "schnitzel",
		img: './images/schnitzel.jpg',
		id: 5,
	},

	{ 
		name: "goldstar",
		img: './images/goldstar.jpg',
		id: 6,
	},
];	

	
	function choose (cardPicked) {  
		if (numClicks == 2){ 
		return;
		}
		else if (numClicks == 0) { 
		  firstChoice = cardPicked;
		  document.images[cardPicked].src = cards[cardPicked];
		  numClicks =1;
		}
		else { 
		  numClicks= 2;
		  secondChoice = cardPicked;
		  document.images[cardPicked].src = cards[cardPicked];
		  timer = setInterval("check()", 1000);
		}
	}

	function check() { // Checking if there is a match 

    clearInterval(timer); //stop timer

    numClicks = 0;
    if (cards[secondchoice] == cards[firstchoice]) {
        numGames++;
        document.getElementById("numGames").innerHTML = "Number of Games";
    } else {
        document.images[firstchoice].src = tempCard;
        document.images[secondchoice].src = tempCard;
        return;
    }
}

   	

	.addEventListener("click", function() { //function to change image that was clicked on from temp to current
	
		document.getElementById("") //get picture that was clicked on




	});






