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

const player = new Player();

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();

    if (keys.right.pressed) {
        player.velocity.x = 2;
    } else if (keys.left.pressed) {
        player.velocity.x = -2;
    } else {
        player.velocity.x = 0;
    }
}

animate();
// TODO Work on player movement as it is not good
// Make W key a keypress and remove some keys to make it more static 
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // A key
            console.log('left');
            keys.left.pressed = true;
            break;

        case 83: // S key
            console.log('down')
            break;

        case 68: // D key
            console.log('right')
            keys.right.pressed = true;
            break;

        case 87: // W key
            console.log('up')
            player.velocity.y -= 20;
            break;
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // A key
            console.log('left');
            keys.left.pressed = false;
            break;

        case 83: // S key
            console.log('down')
            break;

        case 68: // D key
            console.log('right')
            keys.right.pressed = false;
            break;

        case 87: // W key
            console.log('up')
            break;
    }
})