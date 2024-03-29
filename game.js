//Declare Immutable Variables
const grid = document.querySelector(".Grid");
const width = 50;
const resultsDisplay = document.querySelector(".Results");

//We will use these values throughout our code and they need to be mutable
let currentPlayerIndex = 1680;
let direction = 1;
let invaderCourse;
let goingRight = true;
let results = 0;

//Creating the playing battlefield board
function battleField() {
  //This will be a for loop that will create a grid of div elements
  for (let i = 0; i < 1750; i++) {
    const square = document.createElement("div");
    //each element of div will be appended to the html file
    grid.appendChild(square);
  }
}
battleField();

//Array.from will create an Array from all elements that have a Grid class or div tag
//such that my div elements that I created with the above iteration to make 20X20 div elements in a 1000 x 700 px board game
//each can be addressed by the const squares followed by the index
const squares = Array.from(document.querySelectorAll(".Grid div"));

//Creating our Invaders with a constructor to allocate the position to an index number and randomizing the class from reg and super.
class Invader {
  constructor(position) {
    this.position = position;
    this.styleClass = this.getRandomInvaderClass();
  }
  //This will generate the random class for invader and invaderSuper
  getRandomInvaderClass() {
    //We make an array that holds two values in index 0 and 1
    const invaderClasses = ["invader", "invaderSuper"];
    //Math.random is bound by 0 and .9 and we round the decimal to either 0 or 1 depending if it is .5 and above for 1 or less than .5 for zero
    //and that should then return with the assigned class of invaderClasses index
    return invaderClasses[Math.round(Math.random())];
  }
}

//This will be the indices that our invaders will be in
const invaders = [];
for (let i = 0; i <= 130; i++) {
  if (i <= 30) {
    invaders.push(new Invader(i));
  }
  if (i >= 50 && i <= 80) {
    invaders.push(new Invader(i));
  }
  if (i >= 100 && i <= 130) {
    invaders.push(new Invader(i));
  }
}
//The Function draw will insert the array of invaders into the array of squares that have been previously established
//According to our CSS file it will be as such
function draw() {
  //The first line of code will generate the user
  squares[currentPlayerIndex].setAttribute("class", "Player");
  for (let i = 0; i < invaders.length; i++) {
    //we get the square from the grib we created along with the index number aka iteration and set the attribute with a class and call the const invaders[i].styleclass property which is a call function to the getrandominvaderclass function
    squares[invaders[i].position].setAttribute("class", invaders[i].styleClass);
  }
}

function removeInvader() {
  for (let i = 0; i < invaders.length; i++) {
    squares[invaders[i].position].removeAttribute("class");
  }
}
draw();
//Move User
//We take in an event as a parameter from EventListener('keydown', () ) and the callback function is moveUser
document.addEventListener("keydown", moveUser);
function moveUser(e) {
  //we want to first remove the square in which we have drawn the User and use a switch statement to compare what event is triggered
  squares[currentPlayerIndex].classList.remove("Player");
  switch (e.key) {
    case "ArrowLeft":
      //Here we will define the left edge boundry
      if (currentPlayerIndex % width !== 0) {
        currentPlayerIndex -= 1;
      }
      break;
    case "ArrowRight":
      //Here we will define the right edge boundry
      if (currentPlayerIndex % width < width - 1) {
        currentPlayerIndex += 1;
      }
      break;
  }
  //Whichever square the current player ocuppies it will add the class Player
  squares[currentPlayerIndex].classList.add("Player");
}

function moveInvaders() {
  //We will define and store the edges
  // We know if our first [0] invader is at the left edge because all the values % will give us a remainder 0
  const leftEdge = invaders[0].position % width === 0;
  //we take the length of invaders minus index 1 and compare to the width of the battlefield to find the right edge of the board
  const rightEdge =
    invaders[invaders.length - 1].position % width === width - 1;

  removeInvader();

  //keeping invaders in the battlefield
  //In moveInvaders() we defined left and right edges and we want to make sure the invader stays within the right and left edges and account for the direction
  //and make changes accordingly. Direction will either increment or decrement the indices of the invaders within the Array of squares (battle field)
  if (rightEdge && goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i].position += width + 1;
      direction = -1;
      goingRight = false;
    }
  }
  //We do the same for the left hand side of the battlefield however we want to inclue !goingRight (notFalse) statement when going left because at the end of the previous statement
  //we made goingRight = false. Therefore, we want to make that variable true at the end because we will be changing directions to the right after reaching the left edge
  if (leftEdge && !goingRight) {
    for (let i = 0; i < invaders.length; i++) {
      invaders[i].position += width - 1;
      direction = 1;
      goingRight = true;
    }
  }
  //This is where we assign the direction to the invaders indices. Such that if we move one invader the following will also be moved.
  for (let i = 0; i < invaders.length; i++) {
    invaders[i].position += direction;
  }

  draw();

  //Hit Player
  //We check the squares and if any invader and player are on the same square it is a hit and Game Over
  if (squares[currentPlayerIndex].classList.contains("invader", "Player")) {
    //We want to make sure the Invaders stop from advancing by clearing the call for invaderCourse
    clearInterval(invaderCourse);
    //We display in the Results html GAME OVER
    resultsDisplay.innerHTML = "GAME OVER";
  }
  //Hit bottom
  //We also want to check if the invaders hit bottom/landed. In which the Game will also be Over
  for (let i = 0; i < invaders.length; i++) {
    if (invaders[i].position > squares.length) {
      resultsDisplay.innerHTML = "GAME OVER";
      clearInterval(invaders);
    }
  }
}

invaderCourse = setInterval(moveInvaders, 100);
//This function will display and logic the "laser" that Player will shoot to "destroy" the invaders
function laser(e) {
  let laserID;
  //We want the laser to appear from the players location.
  let currentLaserIndex = currentPlayerIndex;
  function moveLaser() {
    //this will keep the errors down but will still throw TypeError: undefined when it hits the top of the grid
    if (squares[currentLaserIndex] != undefined) {
      //We will remove and add the laser and decrement 50 (width) such that it travels vertically
      squares[currentLaserIndex].classList.remove("laser");
      currentLaserIndex -= width;
      squares[currentLaserIndex].classList.add("laser");

      if (
        invaders.find((input) => input.position == currentLaserIndex) !=
        undefined
      ) {
        invaders.find(
          (input) => input.position == currentLaserIndex
        ).styleClass = "";
      }
    }
  }
  switch (e.key) {
    //We pass the (e)vent listener of a keydown and in the case of ArrowuU we call the moveLaser() function every 100 miliseconds
    case "ArrowUp":
      laserID = setInterval(moveLaser, 80);
      break;
  }
}
document.addEventListener("keydown", laser);
