function generateDeck() {

    let deck = [];
    let suit = ["D", "H", "C", "S"];
    let rank = [2,3,4,5,6,7,8,9,10,"A","J","Q","K"];

    for(let i = 0; i < suit.length; i++) {
        for(let j = 0; j < rank.length; j++) {

            deck.push(rank[j] + "-" + suit[i]);

        }
    }

    return deck;
}


function shuffleDeck(deck) {

    let tempDeck = [];

    for(let i = 0; i < 52; i++) {

        let cardIndex = Math.floor(Math.random() * deck.length);

        let card = deck.splice(cardIndex, 1)[0];

        tempDeck.push(card);
    }

    return tempDeck;
}


function loadGame(){

    houseDeck = shuffleDeck(generateDeck());

    for(let i = 0; i < 2; i++) {
        dealerTurn(houseDeck);
        playerTurn(houseDeck);
    }

    document.getElementById("hit_button").onclick = function() {
        playerTurn(houseDeck); 
    
        if (pScore > 21) {
            document.getElementById("hit_button").disabled = true;
            document.getElementById("stand_button").disabled = true;
    
            flipDealerCard();
    
            // Dealer plays until they reach at least 17
            while (dScore < 17) {
                dealerTurn(houseDeck);
            }

            checkWinner();
        }
    
    }
    
    document.getElementById("stand_button").onclick = function() {
    
        document.getElementById("hit_button").disabled = true;
        document.getElementById("stand_button").disabled = true;
    
        flipDealerCard();
    
        while (dScore < 17) {
            dealerTurn(houseDeck);
        }

        checkWinner();
    
    }

    // Attach event listener to the new game button
    document.getElementById("new_game_button").onclick = function() {

        restartGame();

    }

}


function dealerTurn(houseDeck) {

    if(dCardCount == 1) {

        dealerCardOneHidden = houseDeck.pop();

        let cardImg = document.createElement("img");
        cardImg.src = "/blackjack//assets/img/cards/back.png";

        // Assign an ID for easy access when targeting card to flip
        cardImg.id = "dealer_hidden_card"; 

        document.getElementById("dealer_cards_div").append(cardImg);
        dCardCount++;

    } else {

        while(true) {

            let dealerCard = houseDeck.pop();

            let cardImg = "cardImg" + dCardCount;
    
            cardImg = document.createElement("img");

            cardImg.src = "/blackjack//assets/img/cards/" + dealerCard + ".png";
            document.getElementById("dealer_cards_div").append(cardImg);
    
            dScore = dScoreUpdate(dealerCard, dScore);
    
            dCardCount++;
    
            break;
        }
    }

    return dealerCardOneHidden;
}


function flipDealerCard() {

    // Uses id name given "dealer_hidden_card" to target the card 
    let hiddenCardImg = document.getElementById("dealer_hidden_card");

    hiddenCardImg.src = "/blackjack//assets/img/cards/" + dealerCardOneHidden + ".png";

    dScore = dScoreUpdate(dealerCardOneHidden, dScore);
}


function playerTurn(houseDeck) {

    while(true) {

        let playerCard = houseDeck.pop();

        let cardImg = "cardImg" + pCardCount;

        cardImg = document.createElement("img");

        cardImg.src = "/blackjack//assets/img/cards/" + playerCard + ".png";
        document.getElementById("player_cards_div").append(cardImg);

        pScore = pScoreUpdate(playerCard, pScore);

        pCardCount++;

        break;
    }
}


function dScoreUpdate(dCard, dScore) {

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

    return dScore;
}


function pScoreUpdate(pCard, pScore) {

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

    return pScore;
}


function checkWinner() {

    if(dScore > pScore && dScore < 22) {

        document.getElementById("dWinner").innerHTML = "Winner";
    
    } else if (pScore > dScore && pScore < 22) {
    
        document.getElementById("pWinner").innerHTML = "Winner";
        
    } else if (dScore == pScore && dScore < 22 && pScore < 22) {

        document.getElementById("pWinner").innerHTML = "Push";
        document.getElementById("dWinner").innerHTML = "Push";

    } else if (dScore > 21 && pScore < 22) {

        document.getElementById("pWinner").innerHTML = "Winner";

    } else if (pScore > 21 && dScore < 22) {

        document.getElementById("dWinner").innerHTML = "Winner";

    } else {

        document.getElementById("dWinner").innerHTML = "Bust";
        document.getElementById("pWinner").innerHTML = "Bust";

    }
}


function restartGame() {
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

    // Generate and shuffle a new deck
    houseDeck = shuffleDeck(generateDeck());

    // Deal two cards to each player
    for (let i = 0; i < 2; i++) {
        dealerTurn(houseDeck);
        playerTurn(houseDeck);
    }
}


// Game Start
let dScore = 0;
let pScore = 0;
let dCardCount = 1;
let pCardCount = 1;
let dealerCardOneHidden = "";
let houseDeck = [];

loadGame();