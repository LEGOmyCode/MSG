//Declare Variables that will remain constant (immutable)
const grid = document.querySelector('.Grid');
//The width is 50 20x20 squares that equals 1000px width
const width = 50;
const resultsDisplay = document.querySelector('.Results')

//We will use these values throughout our code and they need to be mutable
let currentPlayerIndex = 1680;
let direction = 1;
let invaderCourse;
let goingRight = true;

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
const invaders = []
  for (let i = 0; i <= 130; i++) {
        if(i <= 30){
        invaders.push(i);
        }
        if(i >=50 && i <= 80){
        invaders.push(i)
        }
        if(i >=100 && i <= 130){
        invaders.push(i)
        }
    }
//The Function draw will insert the array of invaders into the array of squares that have been previously established
//According to our CSS file it will be as such
function draw(){
    //The first line of code will generate the user
    squares[currentPlayerIndex].classList.add('Player')
    //the for loop will create a class invader, styled through CSS, in each index specified in the Array we originally assigned with in the squares grid (battleField)
  
    for(let i=0; i < invaders.length; i++){
    squares[invaders[i]].classList.add('invader')}
}
function removeInvader(){
    //the for loop will create a class invader, styled through CSS, in each index specified in the Array we originally assigned with in the squares grid (battleField)
    for(let i=0; i < invaders.length; i++){
    squares[invaders[i]].classList.remove('invader')}
}
draw();



//Move User
//We take in an event as a parameter from EventListener('keydown', () ) and the callback function is moveUser 
document.addEventListener('keydown', moveUser)
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
    //Whichever square the current player ocuppies it will add the class Player
    squares[currentPlayerIndex].classList.add('Player')
}


function moveInvaders(){
    //We will define and store the edges 
    // We know if our first [0] invader is at the left edge because all the values % will give us a remainder 0
    const leftEdge = invaders[0] % width === 0;
    //we take the length of invaders minus index 1 and compare to the width of the battlefield to find the right edge of the board 
    const rightEdge = invaders[invaders.length - 1] % width === width -1;

    removeInvader();


    //keeping invaders in the battlefield
    //In moveInvaders() we defined left and right edges and we want to make sure the invader stays within the right and left edges and account for the direction
    //and make changes accordingly. Direction will either increment or decrement the indices of the invaders within the Array of squares (battle field)
    if(rightEdge && goingRight){
        for(let i = 0; i < invaders.length; i++){
            invaders[i] += width + 1
            direction = -1;
            goingRight = false;
        }
    }
    //We do the same for the left hand side of the battlefield however we want to inclue !goingRight (notFalse) statement when going left because at the end of the previous statement 
    //we made goingRight = false. Therefore, we want to make that variable true at the end because we will be changing directions to the right after reaching the left edge
    if(leftEdge && !goingRight){
        for(let i = 0; i < invaders.length; i++){
            invaders[i] += width - 1;
            direction = 1;
            goingRight = true;
        }
    }
    //This is where we assign the direction to the invaders indices. Such that if we move one invader the following will also be moved.
    for(let i = 0; i < invaders.length; i++){
        invaders[i] += direction;
    }

    draw();

    //Hit Player
    //We check the squares and if any invader and player are on the same square it is a hit and Game Over
    if(squares[currentPlayerIndex].classList.contains('invader', 'Player')){
        //We want to make sure the Invaders stop from advancing by clearing the call for invaderCourse
        clearInterval(invaderCourse);
        //We display in the Results html GAME OVER
        resultsDisplay.innerHTML = 'GAME OVER'
    }
    //Hit bottom
    //We also want to check if the invaders hit bottom/landed. In which the Game will also be Over
    for(let i = 0; i < invaders.length; i++){
        if(invaders[i] > squares.length){
            resultsDisplay.innerHTML = 'GAME OVER';
            clearInterval(invaders);
        }
    }
}

invaderCourse = setInterval(moveInvaders, 50);
//This function will display and logic the "laser" that Player will shoot to "destroy" the invaders
function laser(e){
    let laserID;
    //We want the laser to appear fromt he players location.
    let currentLaserIndex = currentPlayerIndex;
    function moveLaser(){
        //We will remove and add the laser and decrement 50 (width) such that it travels vertically
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');
    }
    switch(e.key){
        //We pass the (e)vent listener of a keydown and in the case of ArrowuU we call the moveLaser() function every 100 miliseconds
        case 'ArrowUp':
            laserID = setInterval(moveLaser, 100)
            break;
        }
}
document.addEventListener('keydown', laser)

