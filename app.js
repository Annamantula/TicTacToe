

const backBoard = Array(9);
backBoard.fill(null);
const cells = document.querySelectorAll(".cell");
const playerX = 'X';
const playerO = 'O';
let active = playerX;
//connect elements
const strike = document.getElementById("strike");
const gameOver = document.getElementById ("gameOver");
const gameOverText = document.getElementById("gameOverText");
const restart = document.getElementById("restart");
restart.addEventListener('click', startOver);

//event listeners
cells.forEach((cell) => cell.addEventListener("click", cellClick));

//setting hover element
function setHoverEl(){
    cells.forEach((cell) =>{
        cell.classList.remove("X-hover");
        cell.classList.remove("O-hover");
    });
    const hoverClass =`${active}-hover`;
    cells.forEach((cell)=>{
        if (cell.innerText == ''){
          cell.classList.add(hoverClass);
        }
    });
}
setHoverEl();

function cellClick (event) {
    if (gameOver.classList.contains("display")){
        return;
    }
    const cell = event.target;
    const cellNum = cell.dataset.index;
    if(cell.innerText!=''){
        return;
    }
    if( active === playerX){
        cell.innerText = playerX;
        backBoard[cellNum-1] = playerX;
        active = playerO;
    }else{
        cell.innerText = playerO;
        backBoard[cellNum-1] = playerO;
        active = playerX;
    }
setHoverEl();
WinnerValidation();
}
function WinnerValidation(){
    for (i=0; i<winningSets.length; i++){
        let winningSet =winningSets[i];
        const set = winningSet.set;
        const strikeDir = winningSet.strikeDir;
        const setValue1 = backBoard[set[0]-1];
        const setValue2 = backBoard[set[1]-1];
        const setValue3 = backBoard[set[2]-1];
        if (setValue1 != null && setValue1===setValue2
            && setValue1===setValue3)
        {strike.classList.add(strikeDir);
            WinnerDisplay(setValue1);
            return;
        } 
    }
    //tie
    const tie = backBoard.every((cell)=> cell !== null);
    if (tie){
        WinnerDisplay();
    }
}
function WinnerDisplay(playerName){
    let text ='TIE';
    if (playerName != null){
        text = `Winner is ${playerName}`;
    }
    gameOver.className = 'display';
    gameOverText.innerText = text;
}
function startOver(){
    strike.className = "strike";
    gameOver.className = "hide";
    backBoard.fill(null);
    cells.forEach((cell)=>(cell.innerText = ''));
    active = playerX;
    setHoverEl();
}  

const winningSets = [
    {set:[1,2,3], strikeDir: "strike-row-1"},
    {set:[4,5,6], strikeDir: "strike-row-2"},
    {set:[7,8,9], strikeDir: "strike-row-3"},

    {set:[1,4,7], strikeDir: "strike-column-1"},
    {set:[2,5,8], strikeDir: "strike-column-2"},
    {set:[3,6,9], strikeDir: "strike-column-2"},

    {set:[1,5,9], strikeDir: "strike-diagonal-1"},
    {set:[3,5,7], strikeDir: "strike-diagonal-2"},
]




