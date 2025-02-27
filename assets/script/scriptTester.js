console.log("H&F Game");
console.log("");

let teamOneDeck = generateDeck();
let teamTwoDeck = generateDeck();

let playerOneHand = [];
let playerTwoHand = [];
let playerThreeHand = [];
let playerFourHand = [];

let discardPack = [];

// Generates House Cards of 6 Decks put together.
function generateDeck() {
    const suits = ["♠️", "♥️", "♦️", "♣️"];
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const value = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    let deck = [];

    for (let k = 0; k < 1; k++) {
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {

                deck.push([suits[i], ranks[j], value[j]]);
            }
        }

        deck.push(["JKR", "JKR", 0]);
        deck.push(["JKR", "JKR", 0]);
    }
    
    return deck;
}


// Gets a new card for a player
function getCard(dealerDeck, yourHand) {

    let cardIndex = Math.floor(Math.random() * dealerDeck.length);

    let newCard = dealerDeck.splice(cardIndex, 1)[0];

    yourHand.push(newCard);
}


// Sorts player cards by value (Bubble Sort)
function sortPlayerCards(tempArray) {
    for (let i = 0; i < tempArray.length - 1; i++) {

        for (let j = 0; j < tempArray.length - i - 1; j++) {

            // Value of current card
            let a = tempArray[j][2];

            // Value of next card
            let b = tempArray[j + 1][2];

            if (a > b) {
                let temp = tempArray[j];
                tempArray[j] = tempArray[j + 1];
                tempArray[j + 1] = temp;
            }
        }
    }
}


// Draw 12 cards for playerOneHand
for (let i = 0; i < 12; i++) {
    getCard(teamOneDeck, playerOneHand);
    getCard(teamOneDeck, playerTwoHand);
    getCard(teamTwoDeck, playerThreeHand);
    getCard(teamTwoDeck, playerFourHand);

}


// Sort player one's hand
sortPlayerCards(playerOneHand);
sortPlayerCards(playerTwoHand);
sortPlayerCards(playerThreeHand);
sortPlayerCards(playerFourHand);


console.log("Team One - Player One");
// Display sorted cards
for (let card of playerOneHand) {
    console.log(...card);
}

console.log("");

console.log("Team One - Player Two");
// Display sorted cards
for (let card of playerTwoHand) {
    console.log(...card);
}

console.log("");

console.log("Team Two - Player One");
// Display sorted cards
for (let card of playerThreeHand) {
    console.log(...card);
}

console.log("");
console.log("Team Two - Player Two");
// Display sorted cards
for (let card of playerFourHand) {
    console.log(...card);
}
