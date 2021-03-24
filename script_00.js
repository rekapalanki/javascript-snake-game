// Select elements on the page - canvas, shake button

const canvas = document.querySelector('#snake');
const ctx = canvas.getContext('2d');
const clear = document.querySelector('.clear');
const MOVE_AMOUNT = 10; // if a value is a true constant, naming convention is ALL_UPPERCASE

// Setup canvas for drawing

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = MOVE_AMOUNT;

// Randomize the beginning point
const { width, height } = canvas; // Make a variable called height and width from the same properties on our canvas.
// create random x and y values for the starting point and for the food

let x = Math.floor(width/2+Math.random()*width/2);
let y = Math.floor(Math.random()*height);
let x2 = Math.floor(Math.random()*width);
let y2 = Math.floor(Math.random()*height);

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

// Write draw function
// A set of API-s (methods) for drawing on the canvas

/*const draw = (options) => { // pass in an options object, and inside of that pass in different properties of that object
    // console.log(options.key);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // move our x and y values depending on keydown event
    switch (options.key) {
        case 'ArrowUp':
            y -= MOVE_AMOUNT;
            break;
    
        case 'ArrowDown':
            y += MOVE_AMOUNT;
            break;

        case 'ArrowLeft':
            x -= MOVE_AMOUNT;
            break;

        case 'ArrowRight':
            x += MOVE_AMOUNT;
            break;

        default:
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}*/

const chgDirection = (options) => {
    console.log('Change direction');
    switch (options.key) {
        case 'ArrowUp':
            
            break;
    
        default:
            break;
    }
}

// const draw = ({ key }) => { // destructuring with function arguments
//     console.log(key);
// }

// Write handler for the keys

const handleKey = (event) => {
    if (event.key.includes('Arrow')) {
        event.preventDefault(); // preventing arrow keys from scrolling the page
        // draw({ key: event.key }); // pass in an object  with a key property
        chgDirection( { key: event.key });
    }
}

// Make snake move and listen to arrow keys
// 01 Make snake move to left AND modify var x to start between width/2 and width;
// 02 Change direction to keystroke
setInterval(function(){
    x -= MOVE_AMOUNT/8;
    snakeStartPoint(); // ***************************** TODO: stop executing at 'click' event *********************************
}, 
125);
console.log(x);

// If snake gets near (~10px) point Food, clear point Food, grow snake body, and draw new Food

// If snake hits canvas borders OR snake body, end game. 

// clear function

const handleClear = (event) => {
    if (event.type = 'click' || event.key === 'Enter') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x = Math.floor(Math.random()*width);
        y = Math.floor(Math.random()*height);
        x2 = Math.floor(Math.random()*width);
        y2 = Math.floor(Math.random()*height);
        snakeStartPoint();
        snakeFood();
        console.log(`x,y,x2,y2 = ${[x,y,x2,y2]}`);
    }
}

clear.addEventListener('click', handleClear);

// listen for arrow keys
window.addEventListener('keydown', handleKey);
