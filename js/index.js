//logic]
//game constants
let inputDir = { x:0, y:0};
const foodSound = new Audio("../sounds/eat.mp3");
const gameOverSound = new Audio("../sounds/gameover.mp3");
const moveSound = new Audio("../sounds/move.mp3");
const musicSound = new Audio("../sounds/gamemusic.mp3");
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 0, y: 0}
]
//here thing to be noted that food is not an array
let food = {x: 6, y :3};

//The most important thing in game is gameloop, whenever we are playing some game, our screen is painted again and again and this is done by gameloop
//Also we will prefer requestAnimationFrame over setInterval to perform such task, which is highly recommended when we work with 
//animations

//Game functions
function main(ctime){
        //window.requestAnimationFrame is calling main functinon one time, but inside main we will again call the window.requestAnimationFrame function and as such the main functioin works as gameloop here
        window.requestAnimationFrame(main);

        // console.log(ctime);
  

    //lastPainttime be some time and ctime is our current time,,,, and ye ctime milliseconds m h, to second m lane k lie we will divide this 
    //b 1000,,,,,,, Hum ye sab kar rhe h to maintain the speed of fps or frame per second..
    //agar (ctime - lastPaintTime)/ 1000 mtlb time m difference 0.5 i.e 1/2 s chhota aata h to hme render ni krwana kuchh yani same frame render ho jaega
    //wrna lastPaintTime update hoga aur wo ctime k barabar ho jaega
    if((ctime - lastPaintTime)/ 1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //  If you bump into yourself
    for(let i = 1; i < snakeArr.length ; i ++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }
    } 
        //If you bump into the wall
        if(snake[0].x >= 18 || snake[0].x <= 0 ||snake[0].y >= 18 || snake[0].y <= 0 ){
            return true;
        }
}

function gameEngine(){
    //part1; updating the snake array
if( isCollide(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x: 0, y:0};
    alert("Game Over! Press any key to begin");
    snakeArr = [{ x: 13, y: 15}];
    // musicSound.play();
    score = 0;
}

     //If  yu have eaten the food increment the score and regenerate the food
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    foodSound.play();
    score += 1;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({x : snakeArr[0].x + inputDir.x , y : snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())} //This is the formula to generate random numbers between a and b.

} 

//Move the snake
for(let i = snakeArr.length - 2; i >= 0; i--){
    snakeArr[i + 1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

    //part2: render the snake and food
    board.innerHTML = " ";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        //distance of row will be calculated in y-axis, from top we will calculte the row
        //similarly column distance is calculate in x- axis 
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index == 0){
            snakeElement.classList.add("head")
        }
        else{
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement);

    })
      //Display the food
      foodElement = document.createElement('div');
      //distance of row will be calculated in y-axis, from top we will calculte the row
      //similarly column distance is calculate in x- axis 
      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;
      foodElement.classList.add("food");
      board.appendChild(foodElement);
}



//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = {x: 0, y:1} //Start the game
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
    
        case "ArrowLeft":
            console.log("Arrow Left")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    
        case "ArrowRight":
            console.log("Arrow Right")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
                
        default:
            break;
    }
})