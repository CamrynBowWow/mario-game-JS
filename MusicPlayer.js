const myMusic = document.querySelector('#gameSound');

let audio = new Audio(myMusic.currentSrc);

export function playMusic() {
	audio.volume = 0.3;
	audio.muted = false;
	audio.play();
	audio.loop = true;
}
