//Declare Variables
const grid = document.querySelector('.Grid');
let currentPlayerIndex = 1680;
//The width is 50 20x20 squares that equals 1000px width
const width = 50;

//First we want to start out by creating the board in which the game will be played
function battleField(){
//This will be a for loop that will create a grid of div elements 
for (let i=0; i < 1750; i++){
    const square = document.createElement('div')
    //each element of div will be appended to the html file
    grid.appendChild(square)
}}
battleField();


//Array.from will create an Array from all elements that have a Grid class or div tag 
//such that my div elements that I created with the above iteration to make 20X20 div elements in a 1000 x 700 px board game
//each can be addressed by the const squares followed by the indice  
const squares = Array.from(document.querySelectorAll('.Grid div'))


//This will be the indices that our invaders will be in
const invaders = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,
    50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
    100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130
]

//The Function draw will insert the array of invaders into the array of squares that have been previously established
//According to our CSS file it will be as such
function draw(){
    //The first line of code will generate the user
    squares[currentPlayerIndex].classList.add('Player')
    //the for loop will create a class invader, styled through CSS, in each index specified in the Array we originally assigned with in the squares grid (battleField)
    for(let i=0; i < invaders.length; i++){
    squares[invaders[i]].classList.add('invader')}
}
draw();



//Move User
//We take in an event as a parameter from EventListener('keydown', () ) and the callback function is moveUser 
function moveUser(e){
    //we want to first remove the square in which we have drawn the User and use a switch statement to compare what event is triggered
    squares[currentPlayerIndex].classList.remove('Player')
    switch(e.key){
        case 'ArrowLeft':
            //Here we will define the left edge boundry 
            if(currentPlayerIndex % width !==0){
                currentPlayerIndex -= 1;}
            break;
        case 'ArrowRight':
            //Here we will define the right edge boundry
            if(currentPlayerIndex % width < width -1){
                currentPlayerIndex +=1;}
            break;
    }
    squares[currentPlayerIndex].classList.add('Player')
}
document.addEventListener('keydown', moveUser)

function moveInvaders(){
    //We will define and store the edges 
    // We know if our first [0] invader is at the left edge because all the values % will give us a remainder 0

}