import { makeDisplayNone, makeDisplayFlex } from './DialogFunctions.js';

export const loseDialog = document.querySelector('#loseDialog');

export function showLoseDialog() {
	loseDialog.style.display = 'flex';
	makeDisplayFlex();
	// loseDialog.classList.replace('hide', 'show'); Might implement

	setTimeout(() => {
		loseDialog.style.display = 'none';
		makeDisplayNone();
		// loseDialog.classList.replace('show', 'hide'); Might implement
	}, 1500);
}
