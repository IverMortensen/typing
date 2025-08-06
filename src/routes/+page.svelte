<script lang="ts">
  import { onMount } from 'svelte';
  import { loadWords } from '$lib/utils/loadWords';
  import TypingBox from '$lib/utils/typingBox.svelte';

  let words: string[] = $state([]);
  let num_words = 50;

  onMount(async () => {
    words = (await loadWords()).slice(0, num_words);
  });
</script>

<div>
  <TypingBox input_words={words}></TypingBox>
</div>

<style>
  :global(body) {
    background-color: rgb(28, 28, 28);
  }
</style>
