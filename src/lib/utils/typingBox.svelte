<script lang="ts">
  let { input_words } = $props();

  let user_input = $state('');
  const space_char = '•';
  let words = $derived(input_words.join(space_char));

  function getExpectedChar(displayChar: string): string {
    return displayChar === space_char ? ' ' : displayChar;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      user_input = user_input.slice(0, -1);
    } else if (event.key.length === 1) {
      user_input += event.key;
    }
  }
</script>

<div class="text-box" tabindex="0" role="textbox" onkeydown={handleKeyDown}>
  {#each words as char, i}
    <span
      class:correct-char={user_input[i] === getExpectedChar(char)}
      class:incorrect-char={user_input[i] !== getExpectedChar(char) && i < user_input.length}
      class:space-char={char === space_char}
    >
      {char}
    </span>
  {/each}
</div>

<style>
  :global(body) {
    background-color: rgb(28, 28, 28);
  }

  .text-box {
    background: #f8f9fa;
    border: 3px solid #cccdce;
    border-radius: 8px;
    padding: 20px;
    font-size: 20px;
    line-height: 1.6;
    min-height: 100px;
    word-wrap: break-word;
    position: relative;
    font-family: 'Courier New', monospace;
    font-weight: 600;
    color: rgb(28, 28, 28);
  }

  .correct-char {
    color: grey;
  }

  .incorrect-char {
    color: #f25255;
  }

  .space-char {
    font-size: 0.6em;
    margin: 0 0.25em;
    vertical-align: middle;
  }
</style>
