import { Platform } from './Platform.js';
import { Player } from './Player.js';
import { GenericObject } from './GenericObject.js';
import { platformSmallTallImage } from './index.js';
import { createImage, platform, hills, background } from './CreateImage.js';

let platformImage = createImage(platform);
export let player = new Player();
export let platforms = [];
export let genericObjects = [];

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
		new Platform({
			xPos: platformImage.width * 6 + 790 - 2,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 7 + 790 - 4 + platformImage.width - platformSmallTallImage.width,
			yPos: 400,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 7 + 790 - 4,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 8 + 783,
			yPos: 400,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 9 + 1190,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 10 + 1185,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 11 + 1180,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 12 + 1177 + platformImage.width - platformSmallTallImage.width,
			yPos: 200,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 12 + 1177 + platformImage.width - platformSmallTallImage.width,
			yPos: 400,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 12 + 1177,
			yPos: 400,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 12 + 1177,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 13 + 1700,
			yPos: 600,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 14 + 1700,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 15 + 1700 - 1,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 16 + 1800,
			yPos: 400,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 17 + 1800 - 2,
			yPos: 400,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 18 + 2100,
			yPos: 400,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 19 + 2100,
			yPos: 550,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 20 + 2098,
			yPos: 550,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 21 + 2097,
			yPos: 550,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 22 + 2096,
			yPos: 550,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 23 + 2095 + platformImage.width - platformSmallTallImage.width,
			yPos: 400,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 23 + 2095,
			yPos: 550,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 24 + 2390,
			yPos: 300,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 25 + 2800,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 26 + 2800 - 1,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 27 + 2800 - 2,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 28 + 3200 - 1 + platformImage.width - platformSmallTallImage.width,
			yPos: 200,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 28 + 3200 - 1 + platformImage.width - platformSmallTallImage.width,
			yPos: 400,
			image: platformSmallTallImage,
		}),
		new Platform({
			xPos: platformImage.width * 28 + 3200 - 1,
			yPos: 600,
			image: platformImage,
		}),
		new Platform({
			xPos: platformImage.width * 29 + 3750,
			yPos: 600,
			image: platformImage,
		}),
	];
	genericObjects = [
		new GenericObject({ xPos: -1, yPos: -1, image: createImage(background) }),
		new GenericObject({ xPos: -1, yPos: 140, image: createImage(hills) }),
	];
}
