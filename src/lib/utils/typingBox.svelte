<script lang="ts">
  let { input_words, user_input } = $props();

  const space_char = '\u200B';
  let words = $derived(input_words.join('\u200B'));

  function getExpectedChar(displayChar: string): string {
    return displayChar === space_char ? ' ' : displayChar;
  }
</script>

<div class="text-box">
  {#each words as char, i}
    <letter
      class:correct-char={user_input[i] === getExpectedChar(char)}
      class:incorrect-char={user_input[i] !== getExpectedChar(char) && i < user_input.length}
      class:space-char={char === '\u200B'}
    >
      {char}
    </letter>
  {/each}
</div>

<style>
  .text-box {
    background: #ededed;
    border: 3px solid #cccdce;
    border-radius: 8px;
    padding: 20px;
    font-size: 30px;
    line-height: 1.6;
    min-height: 100px;
    white-space: pre-wrap;
    word-wrap: break-word;
    position: relative;
    font-family: 'Courier New', monospace;
    font-weight: 600;
    color: rgb(50, 50, 50);
  }

  .correct-char {
    color: grey;
  }

  .incorrect-char {
    color: #f25255;
  }

  .space-char::before {
    font-size: 0.6em;
    margin: 0 0.25em;
    vertical-align: middle;
    content: '•';
  }
</style>
