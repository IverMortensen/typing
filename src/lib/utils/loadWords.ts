export async function loadWords(): Promise<string[]> {
	try {
		const res = await fetch('/words.json');
		if (!res.ok) throw new Error(`Failed to fetch words ${res.status}`);

		const data = await res.json();
		return data as string[];
	} catch (err) {
		console.error('Error loading words', err);
		return [];
	}
}
