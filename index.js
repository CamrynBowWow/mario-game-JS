import { createImage, platform, hills, background, platformSmallTall } from './CreateImage.js';
import { Player } from './Player.js';
import { Platform } from './Platform.js';
import { GenericObject } from './GenericObject.js';

export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

export const gravity = 0.8;

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
