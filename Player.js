import { createImage } from './CreateImage.js';
import { context, canvas, gravity } from './index.js';

let spriteRunLeft = (document.querySelector('.myImg').src = './img/spriteRunLeft.png');
let spriteRunRight = (document.querySelector('.myImg').src = './img/spriteRunRight.png');
let spriteStandLeft = (document.querySelector('.myImg').src = './img/spriteStandLeft.png');
let spriteStandRight = (document.querySelector('.myImg').src = './img/spriteStandRight.png');

export class Player {
	constructor() {
		this.speed = 8;
		this.position = {
			x: 200,
			y: 450,
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

export let player = new Player();
