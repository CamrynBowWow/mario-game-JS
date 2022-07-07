import {createImage} from './CreateImage.js';

let platform = document.querySelector('.myImg').src = './img/platform.png';
let hills = document.querySelector('.myImg').src = './img/hills.png';
let background = document.querySelector('.myImg').src = './img/background.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576; 

const gravity = .8;

class Player {
    constructor() {
        this.position = {
            x: 200,
            y: 100,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.width = 30
        this.height = 30
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    // Gravity code to pull player back down
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        } 
    }
}

class Platform {
    constructor({xPos, yPos, image}) {
        this.position = {
            x: xPos,
            y: yPos,
        }
        
        this.image = image;

        this.width = image.width;
        this.height = image.height;

    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

class GenericObject {
    constructor({xPos, yPos, image}) {
        this.position = {
            x: xPos,
            y: yPos,
        }
        
        this.image = image;

        this.width = image.width;
        this.height = image.height;

    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

let platformImage = createImage(platform);

let player = new Player();
let platforms = [new Platform({xPos: -1, yPos: 470, image: platformImage}), new Platform({xPos: platformImage.width - 3, yPos: 470, image: platformImage}),  new Platform({xPos: platformImage.width * 2 + 150, yPos: 470, image: platformImage})];
let genericObjects = [new GenericObject({xPos: -1, yPos: -1, image: createImage(background)}), new GenericObject({xPos: -1, yPos: -1, image: createImage(hills)})];

let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0; // Used for when the player wins

// Rests all the values and starts the game over when player dies
function init() {
    platformImage = createImage(platform);
    
    player = new Player();
    platforms = [new Platform({xPos: -1, yPos: 470, image: platformImage}), new Platform({xPos: platformImage.width - 3, yPos: 470, image: platformImage}),  new Platform({xPos: platformImage.width * 2 + 150, yPos: 470, image: platformImage})];
    genericObjects = [new GenericObject({xPos: -1, yPos: -1, image: createImage(background)}), new GenericObject({xPos: -1, yPos: -1, image: createImage(hills)})];
    
    scrollOffset = 0; // Used for when the player wins
}

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    genericObjects.forEach(genericObject => {
        genericObject.draw();
    })
    
    platforms.forEach((platform) => {
        platform.draw();
    })

    player.update();

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 4;
    } else if (keys.left.pressed && player.position.x > 170) {
        player.velocity.x = -4;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += 4;
            platforms.forEach((platform) => { // Platforms moves left
                platform.position.x -= 4;
            });
            genericObjects.forEach(genericObject => { // Moves the background and hills left
                genericObject.position.x -= 1.5;
            });
        } else if (keys.left.pressed) {
            scrollOffset -= 4;
            platforms.forEach((platform) => { // Platforms moves right
                platform.position.x += 4;
            });
            genericObjects.forEach(genericObject => { // Moves the background and hills right
                genericObject.position.x += 1.5;
            });
        }
    }

    // Collision with Platform for player to land on and fall off 'platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0;
        }
    })

    // TODO make winner dialog and restart game option and maybe exit game
    // Also make it that the player can't go far back and the platforms stop moving right
    // Win condition
    if (scrollOffset > 2000) {
        console.log('You win');
    } 

    // Lose condition
    if (player.position.y > canvas.height){
        init();
    }
}

animate();

// TODO make S key something 
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // A key 'left'
            keys.left.pressed = true;
            break;

        case 83: // S key 'down'
            // player.velocity.y += 10;
            break;

        case 68: // D key 'right'
            keys.right.pressed = true;
            break;

        case 87: // W key 'up'
            if (player.velocity.y === 0){
                player.velocity.y -= 20;
            }
            break;
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // A key 'left'
            keys.left.pressed = false;
            break;

        case 83: // S key 'down'
            break;

        case 68: // D key 'right'
            keys.right.pressed = false;
            break;

    }
})