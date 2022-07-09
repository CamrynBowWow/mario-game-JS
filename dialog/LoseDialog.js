const loseDialog = document.querySelector('#loseDialog');

export function showLoseDialog() {
	loseDialog.style.display = 'flex';
}

export function hideLoseDialog() {
	loseDialog.style.display = 'none';
}
