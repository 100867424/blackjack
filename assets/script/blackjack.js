function loadBank() {
    bank = 500;
}


function startScreen() {

    for(let i = 0; i < 2; i++) {

        let cardImg = document.createElement("img");
        cardImg.src = "/blackjack/assets/img/cards/back.png";
        document.getElementById("dealer_cards_div").append(cardImg);
    
        cardImg = document.createElement("img");
        cardImg.src = "/blackjack/assets/img/cards/back.png";
        document.getElementById("player_cards_div").append(cardImg);

        document.getElementById("hit_button").disabled = true;
        document.getElementById("stand_button").disabled = true;
        document.getElementById("deal_button").disabled = true;

    }

    document.getElementById("dealer_score").innerHTML = dScore;
    document.getElementById("player_score").innerHTML = pScore;
    document.getElementById("player_bank").innerHTML = bank;
    document.getElementById("player_bet").innerHTML = totalBet;
    document.getElementById("message").innerHTML = "Place Bet!";

}


function newDeal() {

    // Reset scores and card counts
    dScore = 0;
    pScore = 0;
    dCardCount = 1;
    pCardCount = 1;
    dealerCardOneHidden = "";
    
    // Clear displayed scores
    document.getElementById("dealer_score").innerHTML = "0";
    document.getElementById("player_score").innerHTML = "0";

    document.getElementById("dWinner").innerHTML = "";
    document.getElementById("pWinner").innerHTML = "";

    // Clear the dealer's and player's card display areas
    document.getElementById("dealer_cards_div").innerHTML = "";
    document.getElementById("player_cards_div").innerHTML = "";

    // Enable Hit and Stand buttons
    document.getElementById("hit_button").disabled = false;
    document.getElementById("stand_button").disabled = false;
    // Disable Deal Button
    document.getElementById("deal_button").disabled = true;

    document.getElementById("bet_amt_5").disabled = true;
    document.getElementById("bet_amt_10").disabled = true;
    document.getElementById("bet_amt_25").disabled = true;
    document.getElementById("bet_amt_50").disabled = true;
    document.getElementById("bet_amt_100").disabled = true;
    

    document.getElementById("message").innerHTML = "Hit or Stand!";

}


function generateDeck() {

    let deck = [];

    for(let i = 0; i < 4; i++) {

        let suit = ["D", "H", "C", "S"];
        let rank = [2,3,4,5,6,7,8,9,10,"A","J","Q","K"];

        for(let i = 0; i < suit.length; i++) {
            for(let j = 0; j < rank.length; j++) {

                deck.push(rank[j] + "-" + suit[i]);

            }
        }
    }

    return deck;
}


// Fisher-Yates shuffle algorithm:
function shuffleDeck(deck) {

    for (let i = deck.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        // Swap elements
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}


function loadGame(){

    houseDeck = generateDeck();

    houseDeck = shuffleDeck(houseDeck);

    dealerCardOneHidden = houseDeck.pop();

    let cardImg = document.createElement("img");
    cardImg.src = "/blackjack/assets/img/cards/back.png";
    // Assign an ID for easy access when targeting card to flip
    cardImg.id = "dealer_hidden_card"; 
    document.getElementById("dealer_cards_div").append(cardImg);

    dealerTurn(houseDeck);

    for(let i = 0; i < 2; i++) {

        playerTurn(houseDeck);

    }
}

function flipDealerCard() {

    // Uses id name given "dealer_hidden_card" to target the card 
    let hiddenCardImg = document.getElementById("dealer_hidden_card");

    hiddenCardImg.src = "/blackjack/assets/img/cards/" + dealerCardOneHidden + ".png";

    dScoreUpdate(dealerCardOneHidden);
}


function dealerTurn() {

    let dealerCard = houseDeck.pop();

    let cardImg = document.createElement("img");
    cardImg.src = "/blackjack/assets/img/cards/" + dealerCard + ".png";
    document.getElementById("dealer_cards_div").append(cardImg);

    dScoreUpdate(dealerCard);
}


function playerTurn() {

    let playerCard = houseDeck.pop();

    let cardImg = document.createElement("img");
    cardImg.src = "/blackjack/assets/img/cards/" + playerCard + ".png";
    document.getElementById("player_cards_div").append(cardImg);

    pScoreUpdate(playerCard);
}


function dScoreUpdate(dCard) {

    dCard = dCard.split("-");
    let cardVal = dCard[0];

    if(isNaN(cardVal)) {

        if(cardVal == "A") {
            dScore = dScore + 11;
        } else {
            dScore = dScore + 10;
        }

    } else {
        dScore = dScore + Number(cardVal);
    }

    document.getElementById("dealer_score").innerHTML = dScore;
}


function pScoreUpdate(pCard) {

    pCard = pCard.split("-");
    let cardVal = pCard[0];

    if(isNaN(cardVal)) {

        if(cardVal == "A") {
            pScore = pScore + 11;
        } else {
            pScore = pScore + 10;
        }

    } else {
        pScore = pScore + Number(cardVal);
    }

    document.getElementById("player_score").innerHTML = pScore;
}


function checkWinner() {

    if(dScore > pScore && dScore < 22) {

        result = "LOSE";
        document.getElementById("pWinner").innerHTML = result;
    
    } else if (pScore > dScore && pScore < 22) {
    
        result = "WIN";
        document.getElementById("pWinner").innerHTML = result;
        
        
    } else if (dScore == pScore && dScore < 22 && pScore < 22) {

        result = "PUSH";
        document.getElementById("pWinner").innerHTML = result;

    } else if (dScore > 21 && pScore < 22) {

        result = "WIN";
        document.getElementById("pWinner").innerHTML = result;
        
    } else if (pScore > 21) {

        result = "BUST";
        document.getElementById("pWinner").innerHTML = result;
    }


    if (result == "WIN") {
        bank = bank + (totalBet * 2);
    } else if (result == "PUSH") {
        bank = bank + totalBet;
    }

    if (bank == 0) {

        document.getElementById("bet_amt_5").disabled = true;
        document.getElementById("bet_amt_10").disabled = true;
        document.getElementById("bet_amt_25").disabled = true;
        document.getElementById("bet_amt_50").disabled = true;
        document.getElementById("bet_amt_100").disabled = true;

        document.getElementById("message").innerHTML = "Restart Game!";

    } else {

        totalBet = 0;

        document.getElementById("player_bank").innerHTML = bank;
        document.getElementById("player_bet").innerHTML = totalBet;

        document.getElementById("bet_amt_5").disabled = false;
        document.getElementById("bet_amt_10").disabled = false;
        document.getElementById("bet_amt_25").disabled = false;
        document.getElementById("bet_amt_50").disabled = false;
        document.getElementById("bet_amt_100").disabled = false;

        document.getElementById("message").innerHTML = "Place Bet!";

    }
    
}


function betUpdate() {

    if (betAmt > bank) {

        document.getElementById("message").innerHTML = "Balance to low!";
        
    } else {

        totalBet = totalBet + betAmt;
        bank = bank - betAmt;

        document.getElementById("message").innerHTML = "Deal After Betting!";

    }

    document.getElementById("player_bank").innerHTML = bank;
    document.getElementById("player_bet").innerHTML = totalBet;

    document.getElementById("deal_button").disabled = false;
}


// Global Variables 
let bank = 0;
let betAmt = 0;
let totalBet = 0;
let dScore = 0;
let pScore = 0;
let dCardCount = 1;
let pCardCount = 1;
let result = "";
let dealerCardOneHidden = "";
let houseDeck = [];

loadBank();
startScreen();

// Attach event listener to the deal_button button
document.getElementById("deal_button").onclick = function() {

    newDeal();
    loadGame();
}

// Attach event listener to the hit_button button
document.getElementById("hit_button").onclick = function() {
    playerTurn(); 

    if (pScore > 21) {
        document.getElementById("hit_button").disabled = true;
        document.getElementById("stand_button").disabled = true;

        flipDealerCard();

        // Dealer plays until they reach at least 17
        while (dScore < 17) {
            dealerTurn();
        }

        checkWinner();
    }
}

// Attach event listener to the stand_button button
document.getElementById("stand_button").onclick = function() {

    document.getElementById("hit_button").disabled = true;
    document.getElementById("stand_button").disabled = true;

    flipDealerCard();

    while (dScore < 17) {
        dealerTurn();
    }

    checkWinner();
}


// Attach event listener to the bet_amt_5 button
document.getElementById("bet_amt_5").onclick = function() {

    betAmt = 5;
    betUpdate();
}


// Attach event listener to the bet_amt_10 button
document.getElementById("bet_amt_10").onclick = function() {

    betAmt = 10;
    betUpdate();
}


// Attach event listener to the bet_amt_25 button
document.getElementById("bet_amt_25").onclick = function() {

    betAmt = 25;
    betUpdate();
}


// Attach event listener to the bet_amt_50 button
document.getElementById("bet_amt_50").onclick = function() {

    betAmt = 50;
    betUpdate();
}


// Attach event listener to the bet_amt_ button
document.getElementById("bet_amt_100").onclick = function() {

    betAmt = 100;
    betUpdate();
}
