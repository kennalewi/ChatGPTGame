const cards = [
    "🍇", "🍇",
    "🍊", "🍊",
    "🍉", "🍉",
    "🍓", "🍓",
    "🍌", "🍌",
    "🥭", "🥭",
    "🍑", "🍑",
    "🍈", "🍈",
    "🍒", "🍒",
    "🍍", "🍍"
]

    ;

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const startButton = document.querySelector('.start-button');
const playAgainButton = document.getElementById('play-again-button');
const board = document.querySelector('.board');
const startScreen = document.querySelector('.start-screen');
const winScreen = document.getElementById('win-screen');
const testingWindow = document.querySelector('.testingWindow');

toggleDisplay(winScreen, false);
toggleDisplay(board, false);
toggleDisplay(testingWindow, false);

startButton.addEventListener('click', event => {
    shuffleCards();
    toggleDisplay(startScreen, false);
    toggleDisplay(board, true);
    if (toggleSwitch.checked == true){
        toggleDisplay(testingWindow, true);
    }
    else{}
});

board.addEventListener('click', event => {
    if (lockBoard) return;
    const clickedCard = event.target;
    if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('flipped') && !clickedCard.classList.contains('match')) {
        flipCard(clickedCard);
        if (!firstCard) {
            firstCard = clickedCard;
        } else {
            secondCard = clickedCard;
            checkForMatch();
        }
    }
});

function shuffleCards() {
    const shuffledCards = shuffle(cards.slice());
    const cardElements = [];
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card', card);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        cardElement.appendChild(cardInner);
        board.appendChild(cardElement);
        cardElements.push(cardElement);
    });
}

function flipCard(card) {
    card.classList.add('flipped');
    const cardInner = card.querySelector('.card-inner');
    cardInner.textContent = card.getAttribute('data-card');
}


function checkForMatch() {
    if (firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card')) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        setTimeout(() => {
            checkForWin();
        }, 1000);
        firstCard = null;
        secondCard = null;
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.querySelector('.card-inner').textContent = "";
            secondCard.querySelector('.card-inner').textContent = "";
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            lockBoard = false;
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkForWin() {
    const matchedCards = document.querySelectorAll('.match');
    if (matchedCards.length === cards.length) {
        toggleDisplay(board, false);
        toggleDisplay(winScreen, true);
        const matchedCards = document.querySelectorAll('.match');
        if (matchedCards.length === cards.length) {
            toggleDisplay(board, false);
            toggleDisplay(winScreen, true);
            matchedCards.forEach(card => {
                card.parentNode.removeChild(card);
            });
        }

    }
}

// Add a click event listener to the play again button to hide the win screen
playAgainButton.addEventListener('click', event => {
    toggleDisplay(winScreen, false);
    shuffleCards();
    toggleDisplay(startScreen, false);
    toggleDisplay(board, true);
});

function toggleDisplay(element, show) {
    element.style.display = show ? 'flex' : 'none';
}

const toggleSwitch = document.querySelector('#toggleSwitch');

toggleSwitch.addEventListener('change', function () {
    if (toggleSwitch.checked) {
        // do something when toggle is on
        const autoWinButton = document.querySelector('.autoWinButton');
        autoWinButton.addEventListener("click", function () {
            const allCards = document.querySelectorAll('.card');
            allCards.forEach(card => {
                flipCard(card);
                card.classList.add("match");
                setTimeout(() => {
                    checkForWin();
                    toggleDisplay(testingWindow, false);
                }, 1000);
                })
            });

    }
    else {
        // do something when toggle is off
    }
});