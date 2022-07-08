export function createImage(imageSrc) {
	const image = new Image(); // Creates img in html
	image.src = imageSrc;
	return image;
}
