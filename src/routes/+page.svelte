<script lang="ts">
  import { onMount } from 'svelte';
  import { loadWords } from '$lib/utils/loadWords';
  import TypingBox from '$lib/utils/typingBox.svelte';
  import Results from '$lib/utils/results.svelte';
  import { calculateWPM } from '$lib/utils/calculateWPM';

  let words: string[] = $state([]);
  let num_words = 10;
  let userInput = $state('');
  let wpm: number = $state(0);
  let startTime: number | null = null;
  let isTypingComplete = $state(false);
  let expectedText = $state('');

  function getRandomWords(arr: string[], count: number) {
    let length = Math.min(count, arr.length);

    const result = [];
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * arr.length);
      result.push(arr[index]);
    }
    return result;
  }

  onMount(async () => {
    words = getRandomWords(await loadWords(), num_words);
    expectedText = words.join(' ');
  });

  $effect(() => {
    if (userInput.length === expectedText.length && startTime !== null && !isTypingComplete) {
      const endTime = Date.now();
      const timeElapsed = (endTime - startTime) / 1000 / 60; // Convert to minutes
      wpm = calculateWPM(expectedText, userInput, timeElapsed);
      isTypingComplete = true;
    }
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (userInput.length === expectedText.length) {
      return;
    }
    if (startTime === null && event.key.length === 1) {
      startTime = Date.now();
    }

    if (event.key === 'Backspace') {
      userInput = userInput.slice(0, -1);
    } else if (event.key.length === 1) {
      userInput += event.key;
    }
  }
</script>

<div class="typing-container" tabindex="0" role="textbox" onkeydown={handleKeyDown}>
  <TypingBox input_words={words} user_input={userInput}></TypingBox>
</div>

<div class="result-container">
  <Results {wpm}></Results>
</div>

<style>
  :global(body) {
    background-color: rgb(28, 28, 28);
  }

  .typing-container {
    max-width: 80%;
    margin: 0 auto;
    padding: 2rem;
  }

  .result-container {
    max-width: 80%;
    margin: 0 auto;
    padding: 2rem;
  }
</style>
