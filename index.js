import { createImage } from './CreateImage.js';

let platform = (document.querySelector('.myImg').src = './img/platform.png');
let hills = (document.querySelector('.myImg').src = './img/hills.png');
let background = (document.querySelector('.myImg').src = './img/background.png');
let platformSmallTall = (document.querySelector('.myImg').src = './img/platformSmallTall.png');
let spriteRunLeft = (document.querySelector('.myImg').src = './img/spriteRunLeft.png');
let spriteRunRight = (document.querySelector('.myImg').src = './img/spriteRunRight.png');
let spriteStandLeft = (document.querySelector('.myImg').src = './img/spriteStandLeft.png');
let spriteStandRight = (document.querySelector('.myImg').src = './img/spriteStandRight.png');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.8;

class Player {
	constructor() {
		this.speed = 8;
		this.position = {
			x: 200,
			y: 100,
		};

		this.velocity = {
			x: 0,
			y: 0,
		};

		this.width = 66;
		this.height = 150;

		this.image = createImage(spriteStandRight);
		this.frames = 0; // Used to scroll through the png
		this.sprites = {
			stand: {
				right: createImage(spriteStandRight),
				left: createImage(spriteStandLeft),
				cropWidth: 177,
				width: 66,
			},
			run: {
				right: createImage(spriteRunRight),
				left: createImage(spriteRunLeft),
				cropWidth: 341,
				width: 127.875,
			},
		};

		this.currentSprite = this.sprites.stand.right;
		this.currentCropWidth = this.sprites.stand.cropWidth;
	}

	draw() {
		context.drawImage(
			this.currentSprite,
			this.currentCropWidth * this.frames,
			0,
			this.currentCropWidth,
			400,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	// Gravity code to pull player back down
	update() {
		this.frames++; // This will scroll through the png
		if (this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
			this.frames = 0;
		} else if (this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
			this.frames = 0;
		}

		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

		if (this.position.y + this.height + this.velocity.y <= canvas.height) {
			this.velocity.y += gravity;
		}
	}
}

class Platform {
	constructor({ xPos, yPos, image }) {
		this.position = {
			x: xPos,
			y: yPos,
		};

		this.image = image;

		this.width = image.width;
		this.height = image.height;
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y);
	}
}

class GenericObject {
	constructor({ xPos, yPos, image }) {
		this.position = {
			x: xPos,
			y: yPos,
		};

		this.image = image;

		this.width = image.width;
		this.height = image.height;
	}

	draw() {
		context.drawImage(this.image, this.position.x, this.position.y);
	}
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);

let player = new Player();
let platforms = [];
let genericObjects = [];

let lastKey;

let keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
};

let scrollOffset = 0; // Used for when the player wins

// Rests all the values and starts the game over when player dies
function reset() {
	platformImage = createImage(platform);

	player = new Player();
	platforms = [
		new Platform({ xPos: -1, yPos: 470, image: platformImage }),
		new Platform({
			xPos: platformImage.width - 3,
			yPos: 470,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 2 + 150,
			yPos: 470,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 3 + 350,
			yPos: 470,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 4 + 350 - 2 + platformImage.width - platformSmallTallImage.width,
			yPos: 270,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 4 + 350 - 2,
			yPos: 470,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 5 + 790,
			yPos: 470,
			image: platformImage,
		}),
	];
	genericObjects = [
		new GenericObject({ xPos: -1, yPos: -1, image: createImage(background) }),
		new GenericObject({ xPos: -1, yPos: -1, image: createImage(hills) }),
	];

	scrollOffset = 0; // Used for when the player wins
}

function animate() {
	requestAnimationFrame(animate);
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);

	genericObjects.forEach((genericObject) => {
		genericObject.draw();
	});

	platforms.forEach((platform) => {
		platform.draw();
	});

	player.update();

	if (keys.right.pressed && player.position.x < 400) {
		player.velocity.x = player.speed;
	} else if ((keys.left.pressed && player.position.x > 170) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
		player.velocity.x = -player.speed;
	} else {
		player.velocity.x = 0;

		if (keys.right.pressed) {
			scrollOffset += player.speed;
			platforms.forEach((platform) => {
				// Platforms moves left
				platform.position.x -= player.speed;
			});
			genericObjects.forEach((genericObject) => {
				// Moves the background and hills left
				genericObject.position.x -= player.speed * 0.5;
			});
		} else if (keys.left.pressed && scrollOffset > 0) {
			scrollOffset -= player.speed;
			platforms.forEach((platform) => {
				// Platforms moves right
				platform.position.x += player.speed;
			});
			genericObjects.forEach((genericObject) => {
				// Moves the background and hills right
				genericObject.position.x += player.speed * 0.5;
			});
		}
	}

	// Collision with Platform for player to land on and fall off 'platform collision detection
	platforms.forEach((platform) => {
		if (
			player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >= platform.position.y &&
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width
		) {
			player.velocity.y = 0;
		}
	});

	// Makes it look more lively / Sprite switching
	if (keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
		player.frames = 1;
		player.currentSprite = player.sprites.run.right;
		player.currentCropWidth = player.sprites.run.cropWidth;
		player.width = player.sprites.run.width;
	} else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
		player.frames = 1;
		player.currentSprite = player.sprites.run.left;
		player.currentCropWidth = player.sprites.run.cropWidth;
		player.width = player.sprites.run.width;
	} else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
		player.frames = 1;
		player.currentSprite = player.sprites.stand.left;
		player.currentCropWidth = player.sprites.stand.cropWidth;
		player.width = player.sprites.stand.width;
	} else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
		player.frames = 1;
		player.currentSprite = player.sprites.stand.right;
		player.currentCropWidth = player.sprites.stand.cropWidth;
		player.width = player.sprites.stand.width;
	}

	// TODO make winner dialog and restart game option and maybe exit game
	// Win condition
	if (scrollOffset > platformImage.width * 5 + 550) {
		console.log('You win');
	}

	// Lose condition
	if (player.position.y > canvas.height) {
		reset();
	}
}

reset();
animate();

// TODO make S key something
window.addEventListener('keydown', ({ keyCode }) => {
	switch (keyCode) {
		case 65: // A key 'left'
			keys.left.pressed = true;
			lastKey = 'left';
			break;

		case 83: // S key 'down'
			player.velocity.y += 2;
			break;

		case 68: // D key 'right'
			keys.right.pressed = true;
			lastKey = 'right';
			break;

		case 87: // W key 'up'
			if (player.velocity.y === 0) {
				player.velocity.y -= 18;
			}
			break;
	}
});

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
});
