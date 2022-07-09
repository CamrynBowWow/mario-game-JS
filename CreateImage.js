export let platform = (document.querySelector('.myImg').src = './img/platform.png');
export let hills = (document.querySelector('.myImg').src = './img/hills.png');
export let background = (document.querySelector('.myImg').src = './img/background.png');
export let platformSmallTall = (document.querySelector('.myImg').src = './img/platformSmallTall.png');

export function createImage(imageSrc) {
	const image = new Image(); // Creates img in html
	image.src = imageSrc;
	return image;
}
