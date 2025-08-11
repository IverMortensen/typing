<script lang="ts">
  import TypingBox from '$lib/utils/typingBox.svelte';
  import Results from '$lib/utils/results.svelte';
  import { calculateWPM } from '$lib/utils/calculateWPM';
  import { getRandomWords } from '$lib/utils/getRandomWords';
  import { loadWords } from '$lib/utils/loadWords';
  import { onMount } from 'svelte';

  let words: string[] = $state([]);
  let allWords: string[] = $state([]);
  let num_words = 10;
  let userInput = $state('');
  let wpm: number = $state(0);
  let startTime: number | null = null;
  let isTypingComplete = $state(false);
  let expectedText = $state('');

  function endTypingTest() {
    if (!startTime) {
      return;
    }
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000 / 60;
    wpm = calculateWPM(expectedText, userInput, timeElapsed);
    isTypingComplete = true;
  }

  function resetTypingTest() {
    words = getRandomWords(allWords, num_words);
    expectedText = words.join(' ');
    startTime = null;
    userInput = '';
    wpm = 0;
    isTypingComplete = false;
  }

  onMount(async () => {
    allWords = await loadWords();
    resetTypingTest();
  });

  $effect(() => {
    if (userInput.length >= expectedText.length && !isTypingComplete) {
      endTypingTest();
    }
  });

  function handleKeyDown(event: KeyboardEvent) {
    if (
      event.key === 'Enter' ||
      event.key === 'Escape' ||
      (isTypingComplete && event.key === ' ')
    ) {
      resetTypingTest();
      return;
    }

    if (startTime === null && event.key.length === 1) {
      startTime = Date.now();
    }

    if (event.key === 'Backspace') {
      userInput = userInput.slice(0, -1);
      return;
    }

    if (event.key.length === 1) {
      userInput += event.key;
      return;
    }
  }
</script>

<div class="typing-container" tabindex="0" role="textbox" onkeydown={handleKeyDown}>
  <TypingBox input_words={words} user_input={userInput}></TypingBox>
</div>

{#if isTypingComplete}
  <div class="result-container">
    <Results {wpm}></Results>
  </div>
{/if}

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
