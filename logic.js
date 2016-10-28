/*
 Define variables for the values computed by the grabber event
 handler but needed by mover event handler
*/
var diffX, diffY, theElement, starttime, elapsed;
var orderGrid = [0,0,0,0,0,0,0,0,0,0,0,0];

function init(){
  //Set selection
  starttime = new Date().getTime();
  elapsed = 0;
  document.getElementById("timer").innerHTML = "Time Taken: ";
  orderGrid = [0,0,0,0,0,0,0,0,0,0,0,0];

  var rndSet = Math.ceil(Math.random() * 3);
  var imgStr = "";
  var imggrid = [0,0,0,0,0,0,0,0,0,0,0,0];

  //Initializing the pictures
  for(var i = 1; i <= 12; i++){
    var rndGrid = -1;
    do{
      rndGrid = Math.floor(Math.random() * 12);
    }while(imggrid[rndGrid] != 0);
    imggrid[rndGrid] = i;
    imgStr += "<span id=\"" + (rndGrid+1) + "\" style = \"position: absolute; top: 550px; left: " + (100 + 110 * (i-1)) + "px; background-color: lightgrey;\" onmousedown = \"grabber(event);\"><img src=\"img/images" + rndSet + "/img" + rndSet + "-" + (rndGrid+1) + ".jpg\" /></span>";
  }

  document.getElementById("puzzle").innerHTML = imgStr;
}

// The event handler function for grabbing the word
function grabber(event) {

// Set the global variable for the element to be moved

  theElement = event.currentTarget;

// Determine the position of the word to be grabbed,
//  first removing the units from left and top

  var posX = parseInt(theElement.style.left);
  var posY = parseInt(theElement.style.top);

// Compute the difference between where it is and
// where the mouse click occurred

  diffX = event.clientX - posX;
  diffY = event.clientY - posY;

// Now register the event handlers for moving and
// dropping the word

  document.addEventListener("mousemove", mover, true);
  document.addEventListener("mouseup", dropper, true);

// Stop propagation of the event and stop any default
// browser action

  event.stopPropagation();
  event.preventDefault();


}  //** end of grabber

// *******************************************************

// The event handler function for moving the word

function mover(event) {
// Compute the new position, add the units, and move the word

  theElement.style.left = (event.clientX - diffX) + "px";
  theElement.style.top = (event.clientY - diffY) + "px";

// Prevent propagation of the event

  event.stopPropagation();
}  //** end of mover

// *********************************************************
// The event handler function for dropping the word

function dropper(event) {

// Unregister the event handlers for mouseup and mousemove

  document.removeEventListener("mouseup", dropper, true);
  document.removeEventListener("mousemove", mover, true);

// Prevent propagation of the event

  event.stopPropagation();

  reposition();
}  //** end of dropper

function reposition(){
  //Position Puzzle
  var puzzleX = document.getElementById("puzzle").getBoundingClientRect().left;
  var puzzleY = document.getElementById("puzzle").getBoundingClientRect().top;

  //Position Element
  var elementX = parseInt(theElement.style.left) + 50;
  var elementY = parseInt(theElement.style.top) + 50;

  if(elementX > puzzleX && elementX < puzzleX + 400 && elementY > puzzleY && elementY < puzzleY + 300){
    //Position Variable
    var posVar = 0;

    //X
    if(elementX < puzzleX + 100){
      theElement.style.left = puzzleX + "px";
      posVar += 1;
    }else if(elementX < puzzleX + 200){
      theElement.style.left = puzzleX+100 + "px";
      posVar += 2;
    }else if(elementX < puzzleX + 300){
      theElement.style.left = puzzleX+200 + "px";
      posVar += 3;
    }else{
      theElement.style.left = puzzleX+300 + "px";
      posVar += 4;
    }

    //Y
    if(elementY < puzzleY + 100){
      theElement.style.top = puzzleY + "px";
    }else if(elementY < puzzleY + 200){
      theElement.style.top = puzzleY+100 + "px";
      posVar += 4;
    }else{
      theElement.style.top = puzzleY+200 + "px";
      posVar += 8;
    }

    //Affectation
    orderGrid[posVar-1] = theElement.id;
  }
}

function elapsedtime(){
  //Verification if puzzle is correct
  var GridOK = true;

  for(var i = 1; i <= 12; i++){
    if(orderGrid[i-1] != i){
      GridOK = false;
    }
  }

  if(GridOK){
    var time = new Date().getTime() - starttime;
    if(elapsed == 0){
      elapsed = Math.floor(time / 100) / 10;
    }
    document.getElementById("timer").innerHTML = "Time Taken: <br />" + elapsed + " seconds";
    document.getElementById("message").innerHTML = "Congratulations! You got it";
  }else{
    document.getElementById("message").innerHTML = "Better luck next time";
  }


}
