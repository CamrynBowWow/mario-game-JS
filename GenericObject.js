import { context } from './index.js';

export class GenericObject {
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
