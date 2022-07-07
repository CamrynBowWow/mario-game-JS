const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = .8;

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100,
        }

        this.velocity = {
            x: 0,
            y: 1,
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
        } else {
            this.velocity.y = 0;
        }
    }
}

class Platform {
    constructor({xPos, yPos}) {
        this.position = {
            x: xPos,
            y: yPos,
        }

        this.width = 170;
        this.height = 20;
    }

    draw() {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const platforms = [new Platform({xPos: 200, yPos: 700}), new Platform({xPos: 400,yPos: 800})];

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0; // Used for when the player wins

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    platforms.forEach((platform) => {
        platform.draw();
    })

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 4;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -4;
    } else {
        player.velocity.x = 0;

        // Platforms move left and right
        if (keys.right.pressed) {
            scrollOffset += 4;
            platforms.forEach((platform) => {
                platform.position.x -= 4;
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 4;
            platforms.forEach((platform) => {
                platform.position.x += 4;
            })
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
    if (scrollOffset > 2000) {
        console.log('You win');
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