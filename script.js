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
// Write a chgDirection function
// Make snake move and listen to arrow keys
// 01 Make snake move to left AND modify var x to start between width/2 and width;
// 02 Change direction to keystroke
// If snake gets near (~10px) point Food, clear point Food, grow snake body, and draw new Food
// If snake hits canvas borders OR snake body, end game. 
// Start function 

// const move = () => {
//     x -= MOVE_AMOUNT/16;
//     snakeStartPoint();
// }

let timer;

const start = () => {
    x -= MOVE_AMOUNT/16;
    snakeStartPoint();
}

function funcTimer(event) {
    if (event.type = 'click' || event.key === 'Enter') {
        timer = setInterval(start, 15);
    }
}

function stopTimer() {
    clearInterval(timer);
}

startButton.addEventListener('click', funcTimer);

// chgDirection function

const chgDirection = (options) => {
    console.log('Change direction');
    switch (options.key) {
        case 'ArrowUp':
            
            break;
    
        default:
            break;
    }
}

// Write handler for the keys

const handleKey = (event) => {
    event.stopPropagation();
    if (event.key.includes('Arrow')) {
        event.preventDefault(); // preventing arrow keys from scrolling the page
        chgDirection( { key: event.key });
    }
}

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

// listen for arrow keys
window.addEventListener('keydown', handleKey);
