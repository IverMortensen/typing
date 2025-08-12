/**
 * Deletes all charactes of the current word of the user input.
 * Deletes to the space after the previous word.
 *
 * @param userInput - Current user input.
 * @param words - Actual words.
 * @returns Updated copy of the string.
 */
export function deleteCurrentWord(userInput: string, words: string) {
	let currIndex = userInput.length - 1;
	let numChars = currIndex + 1;

	for (let i = currIndex; i >= 0; i--) {
		if (words[i] === ' ') {
			numChars = currIndex - i;
			break;
		}
	}

	return userInput.slice(0, userInput.length - numChars);
}

