'use strict';
const rules = {
              rock:{
                   rock: "drew",
                   paper: "lose",
                   scissors: "win" 
                   },
              paper:{
                    rock: "win",
                    paper: "drew",
                    scissors: "lose"
                    },
              scissors:{
                       rock: "lose",
                       paper: "win",
                       scissors: "drew"
                       }
              }

const options = ["rock", "paper", "scissors"]; 
var myscore = 0;
var compScore = 0;
var scoreBoard, compChoice,finalResult;

document.addEventListener('DOMContentLoaded', function() {
  scoreBoard = document.getElementById("results");
  compChoice = document.getElementById("comp-choice");
  finalResult = document.getElementById("decision");

  mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));
  mdc.ripple.MDCRipple.attachTo(document.querySelector('.fi-button'));
});

function computerPlay(){
  var choiceIndex = Math.floor(Math.random() * 3); //Computer randomly selects an option.
  return options[choiceIndex];
}

function playRound(playerSelection, computerSelection) {
  return rules[playerSelection][computerSelection];
}
function showScores(aResult){
    if(aResult == "win") myscore++;
    else if(aResult == "lose") compScore++;
    var scoresToReturn = myscore + " : " + compScore;
    return scoresToReturn;
}

function startGame(playerSelection){
    console.log("Started");
    if((myscore + compScore) >= 5) myscore = compScore = 0;
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    console.log("Your selection:", playerSelection);

    compChoice.textContent = "Computer's choice: " + computerSelection; 
    scoreBoard.textContent = showScores(result);

    
    if((myscore + compScore) >= 5){
        var place = "lose";
        if(myscore > compScore) place = "win";
        finalResult.textContent = "You " + place;
    }
}