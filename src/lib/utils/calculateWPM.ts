export function calculateWPM(chars: string, userInput: string, time: number) {
	let correctChars = 0;
	let numChars = chars.length;
	let length = Math.min(numChars, userInput.length);

	for (let i = 0; i < length; i++) {
		if (chars[i] === userInput[i]) {
			correctChars++;
		}
	}

	let wrongChars = numChars - correctChars;

	let wpm = (numChars / 5 - wrongChars) / time;

	return Math.round(wpm);
}
