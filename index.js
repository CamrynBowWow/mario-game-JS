import { createImage, platformSmallTall, background } from './CreateImage.js';
import { reset, player, platforms, genericObjects } from './reset/Reset.js';
import { showLoseDialog, hideLoseDialog } from './dialog/LoseDialog.js';
import { showWinDialog, hideWinDialog } from './dialog/WindDialog.js';
import { makeDisplayNone, makeDisplayFlex } from './dialog/DialogFunctions.js';

export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');
const restartButton = document.querySelector('#restartButton');

canvas.width = 1280;
canvas.height = 720;

let backgroundWidth = createImage(background);

export const gravity = 0.8;

export let platformSmallTallImage = createImage(platformSmallTall);

let won = false; // Used to see if the player has beat the game

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
let restartButtonClicked = false;

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
		restartButtonClicked = false;
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

	// TODO make game option to maybe exit game
	// Win condition
	if (scrollOffset / 2 > backgroundWidth.width - 1450) {
		makeDisplayFlex();
		showWinDialog();
		won = true;
		player.speed = 0;

		if (restartButtonClicked) {
			makeDisplayNone();
			hideWinDialog();
			won = false;
			player.speed = 8;
			scrollOffset = 0;
		}
	}

	// Lose condition
	if (player.position.y > canvas.height) {
		makeDisplayFlex();
		showLoseDialog();
		scrollOffset = 0;

		if (player.position.y > canvas.height + 2000) {
			reset();
			makeDisplayNone();
			hideLoseDialog();
		}
	}
}

// This will fire the functions that display the background, player and platforms when all the files have loaded
window.onload = function () {
	animate();
	reset();
};

restartButton.addEventListener('click', () => {
	restartButtonClicked = true;
	reset();
});

// TODO make S key something
window.addEventListener('keydown', ({ keyCode }) => {
	switch (keyCode) {
		case 65: // A key 'left'
			keys.left.pressed = true;
			lastKey = 'left';
			break;

		case 83: // S key 'down'
			if (!won) {
				player.velocity.y += 2;
			}
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
