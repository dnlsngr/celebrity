
//var nameList = [{{namelist|safe}}];This is now in the main page
var timerLength = 45;
var numPlayers = 2;


var pointsArray = [];
var timerStatus = 0;
var thisName = "";
var namesCompleted = [];
var roundLimit;//The number of names that a team is allowed to see (near the end of the round this kicks in for fairness)
var round = 1;
var teamIndex = 0;
var timerHandle;//used to end the timer

var ScoreboardData = {
	
}
var GameplayData = {
	gameInProgress : false
}

function setupScoreboard(numPlayers){
	for (var n = 0; n < numPlayers; n++){
		var teamName = document.createElement('label');
		teamName.appendChild(document.createTextNode("Team " + n + ": "));
		
		var score = document.createElement('label');
		score.id = 'scoreTotal' + n;
			
		var brk = document.createElement('br');
		
		document.getElementById('scores').appendChild(teamName);
		document.getElementById('scores').appendChild(score);
		document.getElementById('scores').appendChild(brk);
	}
}
	
function showScoreboard(){
	document.getElementById('tallyDone').blur();
	
	
	for (var i =0; i < pointsArray.length; i++){
		var idstr = "scoreTotal" + i;
		document.getElementById(idstr).innerHTML = pointsArray[i];
	}

	document.getElementById('scoreboard').style.visibility = "visible";
	document.getElementById('gameplay').style.visibility = "hidden";
	document.getElementById('tally').style.visibility = "hidden";
	
	if (nameList.length > 0){
		//TODO: add logic to only show some of the name list
		document.getElementById('nextRound').style.visibility = "hidden";
		document.getElementById('startTurn').style.visibility = "visible";	
	}
	else{
		document.getElementById('nextRound').style.visibility = "visible";
		document.getElementById('startTurn').style.visibility = "hidden";	
		changeRoundText();
	} 
}

function changeRoundText(){
	round++;
	if (round == 2){
		document.getElementById('roundRulesLabel').innerHTML = "Round 2: Only 1 word per name!";
	}
	else if (round == 3){
		document.getElementById('roundRulesLabel').innerHTML = "Round 3: Acting only!";
	}
	else{
		document.getElementById('roundRulesLabel').innerHTML = "Final Score";
		document.getElementById('nextRound').style.visibility = "hidden";
	}
	
}

function startGameplayWithNewRound(){
	document.getElementById('nextRound').blur;//Need to unfocus or we will reclick this
	nameList = namesCompleted;
	namesCompleted = [];
	showGameplay();
}

function showGameplay(){
	document.getElementById('nextRound').blur();//unfocus
	document.getElementById('startTurn').blur();//unfocus
	shuffleArray(nameList);
	
	document.getElementById('scoreboard').style.visibility = "hidden";
	document.getElementById('nextRound').style.visibility = "hidden";
	document.getElementById('startTurn').style.visibility = "hidden";
	document.getElementById('gameplay').style.visibility = "visible";
	document.getElementById('tally').style.visibility = "hidden";
	
	namesCompleted = [];
	thisName = "";
	GameplayData.gameInProgress = true;
	
	if (teamIndex === 0){
		console.log(nameList.length);
		console.log(numPlayers);
		roundLimit = parseInt(nameList.length/numPlayers) + 1;
		console.log(roundLimit);
	}
	
	showWord();//kick off the first name
	
	setTimerStatus(timerLength);
	timerHandle = setInterval(function(){
		this.setTimerStatus(timerStatus-1);
		if (timerStatus === 0)
			this.endTimer();
	},1000);
}
	
function showWord(){
	if (thisName !== ""){
		namesCompleted.push(thisName);
		
		console.log("clearing name");
		thisName = "";
	}
	if (nameList.length === 0){
		endTimer();
	}
	else if (namesCompleted.length >= roundLimit){
		document.getElementById('roundLimitReached').style.visible = 'visible';
		endTimer();
		
	}
	else{
		thisName = nameList.pop();
		for (var i = 0; i < nameList.length; i++){
			console.log(i + ": " + nameList[i]);
		}
		document.getElementById('currentName').innerHTML = thisName;
	}
}
	
function setTimerStatus(newVal){
	timerStatus = newVal;
	document.getElementById('timer').innerHTML = newVal;
}
	
function endTimer(){
	clearInterval(timerHandle);
	if (thisName != ""){
		nameList.push(thisName);//doesn't get added to completed names
	}
	GameplayData.gameInProgress = false;
	showTally();	
}


function showTally(){
	document.getElementById('scoreboard').style.visibility = "hidden";
	document.getElementById('gameplay').style.visibility = "hidden";
	document.getElementById('tally').style.visibility = "visible";
	
	while (document.getElementById('tallychecks').firstChild) {
    	document.getElementById('tallychecks').removeChild(document.getElementById('tallychecks').firstChild);
	}
	
	count = 0
	for (var n in namesCompleted){
		var checkBoxElement = document.createElement("input");
		checkBoxElement.type = "checkbox";
		checkBoxElement.id = "nameCheck" + count;
		checkBoxElement.checked = true;
		
		var label = document.createElement('label');
		label.htmlFor = "nameCheck" + count;
		label.appendChild(document.createTextNode(namesCompleted[n]));
		
		var brk = document.createElement('br');
		
		document.getElementById('tallychecks').appendChild(checkBoxElement);
		document.getElementById('tallychecks').appendChild(label);
		document.getElementById('tallychecks').appendChild(brk);
		count++;
	}
}
	
function tallyDone(){
	document.getElementById('roundLimitReached').style.visible = 'hidden';
	
	tallychecks = document.getElementById('tallychecks').children;
	
	points = 0;
	for(var i = 0; i < tallychecks.length; i++){
		if (tallychecks[i].checked === true){
			points++;		
		}
	}
	console.log(points);
	console.log(teamIndex);
	pointsArray[teamIndex] += points;
	teamIndex = (teamIndex + 1)%numPlayers;
	showScoreboard();	
}


function startGame(){
	setupScoreboard(numPlayers);
	
	
	pointsArray = [];
    while(pointsArray.length < numPlayers) pointsArray.push(0);//Initialize all scores to 0
	showScoreboard();
}

//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function pressed(e)
{
	//Press any key to advance
	if (GameplayData.gameInProgress){
        showWord()
    }
}

