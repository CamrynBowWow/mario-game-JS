import { Platform } from './Platform.js';
import { Player } from './Player.js';
import { GenericObject } from './GenericObject.js';
import { platformSmallTallImage } from './index.js';
import { createImage, platform, hills, background } from './CreateImage.js';

export let platformImage = createImage(platform);
export let player = new Player();
export let platforms = [];
export let genericObjects = [];

export let scrollOffsetNumber = 0;

export function reset() {
	platformImage = createImage(platform);

	player = new Player();
	platforms = [
		new Platform({ xPos: -1, yPos: 600, image: platformImage }),
		new Platform({
			xPos: platformImage.width - 3,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 2 + 150,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 3 + 350,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 4 + 350 - 2 + platformImage.width - platformSmallTallImage.width,
			yPos: 400,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 4 + 350 - 2,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 5 + 790,
			yPos: 600,
			image: platformImage,
		}),
	];
	genericObjects = [
		new GenericObject({ xPos: -1, yPos: -1, image: createImage(background) }),
		new GenericObject({ xPos: -1, yPos: 140, image: createImage(hills) }),
	];

	scrollOffsetNumber = 0; // Used for when the player wins
}
