
/*
Es un array que contiene en cada posición el id de la carta. Su longitud será el doble
que el número de cartas distintas en el juego. Por ejemplo en el caso de 2 cartas distintas
un posible valor del array seria [0,1,1,0] 
*/
let cards;
// Numero de parejas que habrá en el juego
let numPairs = 5;

let selectedCard = null;

// Numero de movimientos realizados
let moves = 0;
// Numero de parejas encontradas
let findedPairs = 0;

// Este método inicializa de forma aleatoria las cartas para que despues se puedan mostrar.
function initCards() {
    cards = new Array(numPairs * 2);
    let indices = Array.from(Array(numPairs * 2).keys());
    let i = 0;
    while (indices.length > 0) {
        let indexPair = i++ % numPairs;
        const posRandom = Math.floor(Math.random() * indices.length);
        const posResult = indices.splice(posRandom, 1)[0];
        cards[posResult] = indexPair;
    }


}

// Este método pintará las cartas según la disposición en el array cards
function paintCards() {
    for(let i = 0; i < cards.length; i++){
        let element = generateHtmlCard(cards[i]);
        $('.board').append(element);
    }
    $('.card').on('click', function(event){
        if (!$(this).hasClass('active') && !$(this).hasClass('finded')) {
            $(this).addClass('active');
            console.log($(this).data('value'));
            selectCard($(this));
        }
    });
}

/*
Este método genera y devuelve el html de una card para el valor de carta pasado como parametro
Además añade un atributo "data-value" para poder identificar la carta cuando el usuario clique 
en ella
*/
function generateHtmlCard(value) {
    const html = `<div class="card" data-value="${value}">
        <div class="card-inner">
            <div class="side back">
                <img src="assets/imgs/${value}.png">
            </div>
            <div class="side front">
                <img src="assets/imgs/back-pokemon.png">
            </div>
        </div>
    </div>`;
    return html;
}


/* 
Este método comprueba si el juego ha finalizado. Habrá finalizado cuando el número de parejas
encontradas sea igual al número de parejas 
*/
function hasFinishedGame() {
    return findedPairs === numPairs;
}

// Este método tendra la logica a ejecutar cuando el juego finalice
let stop = false;
function finishGame() {
    while(stop === false){
        if(numPairs === findedPairs){
            $('.popup-win').addClass('show');
            stop = true;
        }
    }
}

// Este método contendrá la lógica cuando se pincha en una carta.
function selectCard(card) {
    // Aqui tendremos el código de mostrar la carta, si ya teniamos una seleccionada chequear si 
    // iguales y realizar las acciones necesarias en el caso de que lo sean o no lo sean.
    if(selectedCard === null){
        selectedCard = card;
        return;
    }

    if(selectedCard.data('value') === card.data('value')){
        findedPairs++;
        moves++;
        selectedCard = null;
    }else{
        selectedCard.removeClass('active');
        card.removeClass('active');
        moves++;
        selectedCard = null;
    }

    $('#counter-moves').text(moves);

    if (hasFinishedGame()) {
        finishGame();
    }
}

function initCounters() {
    selectedCard = null;
    moves = 0;
    findedPairs = 0;
}

function startGame(level) {
    numPairs = level;
    initCounters();
    initCards();
    paintCards();
}



$(document).ready(function () {
    startGame(numPairs);
});


