export function getRandomWords(arr: string[], count: number) {
	let length = Math.min(count, arr.length);

	const result = [];
	for (let i = 0; i < length; i++) {
		const index = Math.floor(Math.random() * arr.length);
		result.push(arr[index]);
	}
	return result;
}

