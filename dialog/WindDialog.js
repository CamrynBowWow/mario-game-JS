const winDialog = document.querySelector('#winDialog');

export function showWinDialog() {
	winDialog.style.display = 'flex';
}

export function hideWinDialog() {
	winDialog.style.display = 'none';
}
