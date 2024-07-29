const items = [
    { id: 1, type: 'penis', icon: '🍆' },
    { id: 2, type: 'camisinha', icon: '📦' },
    { id: 3, type: 'vagina', icon: '🌸' },
    { id: 4, type: 'anticoncepcional', icon: '💊' },
    { id: 5, type: 'penis', icon: '🍆' },
    { id: 6, type: 'camisinha', icon: '📦' },
    { id: 7, type: 'vagina', icon: '🌸' },
    { id: 8, type: 'anticoncepcional', icon: '💊' },
    { id: 9, type: 'penis', icon: '🍆' },
    { id: 10, type: 'camisinha', icon: '📦' },
    { id: 11, type: 'vagina', icon: '🌸' },
    { id: 12, type: 'anticoncepcional', icon: '💊' },
    { id: 13, type: 'penis', icon: '🍆' },
    { id: 14, type: 'camisinha', icon: '📦' },
    { id: 15, type: 'vagina', icon: '🌸' },
    { id: 16, type: 'anticoncepcional', icon: '💊' }
];

let selectedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    shuffle(items);
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = item.id;
        card.dataset.type = item.type;
        card.innerHTML = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (this.classList.contains('matched') || selectedCards.length === 2) return;

    const cardId = this.dataset.id;
    const cardType = this.dataset.type;
    this.innerHTML = items.find(item => item.id == cardId).icon;
    selectedCards.push({ id: cardId, type: cardType, element: this });

    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.type === 'penis' && secondCard.type === 'vagina' || 
        firstCard.type === 'vagina' && secondCard.type === 'penis') {
        document.querySelector('.game-over').style.display = 'block';
        return;
    }

    if ((firstCard.type === 'penis' && secondCard.type === 'camisinha') ||
        (firstCard.type === 'camisinha' && secondCard.type === 'penis') ||
        (firstCard.type === 'vagina' && secondCard.type === 'anticoncepcional') ||
        (firstCard.type === 'anticoncepcional' && secondCard.type === 'vagina')) {
        firstCard.element.classList.add('matched');
        secondCard.element.classList.add('matched');
        matchedPairs++;
    } else {
        firstCard.element.innerHTML = '?';
        secondCard.element.innerHTML = '?';
    }

    selectedCards = [];

    if (matchedPairs === items.length / 2 - 1) {
        alert('Não Engravidou Fique Feliz');
    }
}

createBoard();
