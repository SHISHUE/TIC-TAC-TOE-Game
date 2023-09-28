const gameInfo = document.querySelector('.game-info');
const boxes = document.querySelectorAll('.box');
const button = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winingPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initGame() {
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index) => {
        box.innerText = "";
        box.classList = `box box-${index+1}`;
        boxes[index].style.pointerEvents = "all";
    });
    gameInfo.innerText = `Current  Player - ${currentPlayer}`;

}
initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X"
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    // button.classList.add('active');
    let answer = "";
    winingPositions.forEach(position => {
        if( (gameGrid[position[0]] !== ""  || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] ===gameGrid[position[1]] ) && (gameGrid[position[1]]===gameGrid[position[2]])) {
            
            if(gameGrid[position[0]] === "X") 
                answer = "X";
            else 
                answer = "O";

            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })


            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${currentPlayer}`;
        button.classList.add('active');
        return;
    }

    let fillCount = 0;
    gameGrid.forEach(box =>{
        if(box !== "") {
            fillCount++;
        }
    });

    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied"
        button.classList.add('active');
    }
}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    }
}
boxes.forEach((box,index) => {
    box.addEventListener('click',() => {
        handleClick(index);
    })
});


button.addEventListener('click' , initGame);