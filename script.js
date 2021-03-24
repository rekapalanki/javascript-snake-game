// Select elements on the page - canvas, start and stop button
const [canvas, startButton, stopButton, MOVE_AMOUNT] = [
    document.querySelector('#snake'), 
    document.querySelector('.start'), 
    document.querySelector('.reset'),
    10,
];
const ctx = canvas.getContext('2d');

// Setup canvas for drawing
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;
// Randomize the beginning point
const { width, height } = canvas; // Make a variable called height and width from the same properties on our canvas.
// create random x and y values for the starting point and for the food
let [x, y, x2, y2] = [
    Math.floor(width/2+Math.random()*width/2), 
    Math.floor(Math.random()*height), 
    Math.floor(Math.random()*width), 
    Math.floor(Math.random()*height),
]
// Reusable code for snake starting point and food
const snakeStartPoint = () => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
}
const snakeFood = () => {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
snakeStartPoint();
snakeFood();

// Write a start function
// Write a chgDirection function and make snake move and listen to arrow keys
// 01 Make snake move to left AND modify var x to start between width/2 and width;
// 02 Change direction to keystroke
// If snake gets near (~10px) point Food, clear point Food, grow snake body, and draw new Food
// If snake hits canvas borders OR snake body, end game. 
// !!!!!! ANOTHER GAME IDEA! Get an outline of a city map / drawing. Drop a point on the canvas and draw along the outline. Succeed: +/- 5*MOVE_AMOUNT around the outline AND lines connnected (+/- 2*MOVE_AMOUNT).
// !!!!!! OPTIMALIZE SNAKE GAME FOR MOBILE / TABLET using sweeping moves. Write handler for sweeping movement.

let [timer, interval] = [0, null]; // 01 declare timer and interval

// 02 Create start function
const moveXMinus = () => {
    x -= MOVE_AMOUNT/16;
    snakeStartPoint();
}

// 03 Create timer event handler
function funcTimer(event) {
    // event.stopPropagation();
    // if (event.type = 'click' || event.key === 'Enter') {
        console.log(timer);
        if (timer%2 == 1) {
            clearInterval(interval);
        } else {
            interval = setInterval(moveXMinus, 15);
        }
        timer++;
        console.log(timer);
        console.log(interval);
    // }
}

// 05 Create clearInterval function and add to Stop button
function stopTimer() {
    clearInterval(interval);
    timer = 0;
}

// 04 Add timer function to event listener
startButton.addEventListener('click', funcTimer); 

// chgDirection function

const chgDirection = (options) => {
    console.log('Change direction');
    clearInterval(interval);
    timer = 0;
    if (timer%2 == 1) {
        clearInterval(interval);
    } else {
        interval = setInterval(
        function() {
            switch (options.key) {
                case 'ArrowUp':
                    y -= MOVE_AMOUNT/16;
                    snakeStartPoint();
                break;

                case 'ArrowDown': 
                    y += MOVE_AMOUNT/16;
                    snakeStartPoint();
                break;

                case 'ArrowLeft':
                    x -= MOVE_AMOUNT/16;
                    snakeStartPoint(); 
                break;

                case 'ArrowRight': 
                    x += MOVE_AMOUNT/16;
                    snakeStartPoint();
                break;

                default:
                    break;
                }
            },
        15);
    }
    timer++;
    console.log(timer);
    console.log(interval);
}

// Write handler for the keys

const handleKey = (event) => {
    event.stopPropagation();
    if (event.key.includes('Arrow')) {
        event.preventDefault(); // preventing arrow keys from scrolling the page
        chgDirection( { key: event.key });
    }
}

// listen for arrow keys
window.addEventListener('keydown', handleKey);

// Reset function

const handleReset = (event) => {
    event.stopPropagation();
    if (event.type = 'click' || event.key === 'Enter') {
        clearInterval(timer); // ***************************** TODO: stop executing at handleStop 'click' event *********************************
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x = Math.floor(Math.random()*width);
        y = Math.floor(Math.random()*height);
        x2 = Math.floor(Math.random()*width);
        y2 = Math.floor(Math.random()*height);
        snakeStartPoint();
        snakeFood();
        console.log(`x,y,x2,y2 = ${[x,y,x2,y2]}`);
        stopTimer();
    }
}

// stopButton.addEventListener('click', handleStop);
stopButton.addEventListener('click', handleReset);
