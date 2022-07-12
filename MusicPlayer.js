const myMusic = document.querySelector('#gameSound');

export function playMusic() {
	myMusic.volume = 0.015;
	myMusic.play();
	myMusic.loop = true;
}
