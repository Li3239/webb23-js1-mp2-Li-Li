// player1 button styles
const playImgList = ["./image/rock.png", "./image/paper.png", "./image/scissors.png"];
const gameItems = ["rock", "paper", "scissors"];
const winImg = "./image/trophy.png";
const lostImg = "./image/lost.png";

//*************************
// variable difinition
//*************************
// initialize the number of times the contestants win
let counter1 = 0;
let counter2 = 0;
const roundsNumber = 3;

// form
let form1 = document.querySelector("#form1");
let form2 = document.querySelector("#form2");
// input user name
let userName1 = document.querySelector("#userName1");
let userName2 = document.querySelector("#userName2");
// player1 play buttons 
let playerButtons = document.querySelectorAll(".player-button1");
// score
let score1 = document.querySelector(".score1");
let score2 = document.querySelector(".score2");
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");
// player img
let player1Img = document.querySelector(".player1-img")
let player2Img = document.querySelector(".player2-img")
// winner show 
let winnerDiv = document.querySelector(".winner-show");
let winnerName = document.querySelector(".result-info");
let winnerImg = document.querySelector(".result-img");

//*******************************************************
// form submit events
// input focusout events
//*******************************************************
form1.addEventListener("submit",setPlayerName);
form2.addEventListener("submit",setPlayerName);
userName1.addEventListener("focusout", setPlayerName);
userName2.addEventListener("focusout", setPlayerName);

function setPlayerName(event) {
    event.preventDefault();
    console.log("event.target = ", event.target);
    if(event.target.id == "userName1" || event.target.id == "form1") {
        player1Name.innerText = userName1.value;
    }else if(event.target.id == "userName2" || event.target.id == "form2") {
        player2Name.innerText = userName2.value;
    }
}

//*******************************************************
// Restart button click event
//*******************************************************
// restart button
const restartBtn = document.querySelector(".restart-button");
restartBtn.addEventListener("click", resetGame);

// when user click [Rock],[Paper],[Scissors]
const containerPlay = document.querySelector(".container-play");
containerPlay.addEventListener("click", startGame);

//*******************************************************
// play buttons is clicked 
//*******************************************************
function startGame(event) {
    // console.log(event);

    if(event.target.tagName !== "BUTTON") {
        return;
    } else if(String(userName1.value).length == 0) {
        alert("Please input your name.");
        userName1.focus();
        return;
    } else {
        changeButtonStyle(event);

        //eg. button id="btn-rock" -> return "rock"
        const player1 = String(event.target.id).substring(4);
        player1Img.src = playImgList[gameItems.indexOf(player1)];
        player1Img.style.display = "flex";

        //get random value for computer
        let random = Math.floor(Math.random()*3);
        const player2 = gameItems[random];
        
        //show the player2 random img
        player2Img.src = playImgList[random];
        player2Img.style.display = "flex";
        
        //check who wins
        let result = checkResult(player1, player2);

        //set the result in the score list
        setResult(result);
    }
}

//*******************************************************
// when player1 buttons are clicked, 
// switch "active" class available/inavailable
// "active" : set in css file
//*******************************************************
function changeButtonStyle(event) {
    if(event.target.classList.contains("player-button1")){
        for(let i=0; i<playerButtons.length; i++) {
            playerButtons[i].classList.remove("active");
        }
        event.target.classList.add("active");
    }
}

//*******************************************************
// check rock-paper-scissors
// @param: item1: player1
// @param: item2: player2
// return: 1: player1 win
//         2: player2 win
//         0: same
//        -1: error
//*******************************************************
function checkResult(item1, item2) {
    let ret = 0;
    if(gameItems.indexOf(item1) == -1 || gameItems.indexOf(item2) == -1) {
        return -1;
    }

    if(item1 == "rock") {
        if(item2 == "paper") {
            ret = 2;
        } else if(item2 == "scissors") {
            ret = 1;
        } 
    }else if(item1 == "paper") {
        if(item2 == "rock") {
            ret = 1;
        } else if(item2 == "scissors") {
            ret = 2;
        } 
    }else if(item1 == "scissors") {
        if(item2 == "rock") {
            ret = 2;
        } else if(item2 == "paper") {
            ret = 1;
        } 
    }
    return ret;
}

//*******************************************************
// Display match results in a table
//*******************************************************
// function setResult(result, player1, player2) {
function setResult(result) {
    // count up match scores for both players
    if(result == 1){
        counter1++;
    }else if(result == 2){
        counter2++;
    }

    // to show scores 
    score1.innerText = counter1;
    score2.innerText = counter2;

    // to show result image
    if(counter1 >= roundsNumber) {
        // user wins
        winnerName.innerText = `${userName1.value}, Congratulation!`
        winnerImg.src = winImg;
        winnerName.style.color = "orange";
    }else if(counter2 >= roundsNumber) {
        //user losts
        winnerName.innerText = `Ooops...`
        winnerImg.src = lostImg;
        winnerName.style.color = "black";
    }
    if(counter1 >= roundsNumber || counter2 >= roundsNumber) {
        winnerDiv.style.display = "flex";
        setTimeout(resetGame, 3000);
        // Disable the playing buttons
        for(let i=0; i<playerButtons.length; i++) {
            playerButtons[i].disabled = true;
        }
    }
}

//*******************************************************
// Restart game
//*******************************************************
function resetGame() {
    // reset html elements
    score1.innerText = "0";
    score2.innerText = "0";

    // clear counters
    counter1 = 0;
    counter2 = 0;

    // clear [active] class from player1 play buttons
    for(let i=0; i<playerButtons.length; i++) {
        playerButtons[i].classList.remove("active");
        playerButtons[i].disabled = false;
    }

    // hide player images
    player1Img.style.display = "none";
    player2Img.style.display = "none";

    // hide result image 
    winnerDiv.style.display = "none";
}