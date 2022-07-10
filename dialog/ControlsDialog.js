const controlsDialog = document.querySelector('#controls');

export function showControlsDialog() {
	controlsDialog.style.display = 'flex';
}

export function hideControlsDialog() {
	controlsDialog.style.display = 'none';
}
