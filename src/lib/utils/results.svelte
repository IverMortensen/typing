<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  let { wpm } = $props();
</script>

<div class="results-box" in:fly={{ y: 200, duration: 500 }} out:fade>
  <div class="wpm">
    {wpm}wpm
  </div>
</div>

<style>
  .results-box {
  }

  .wpm {
    border-radius: 5px;
    color: rgb(50, 50, 50);
    background-color: white;
    width: max-content;
    font-size: 30px;
    font-family: 'Courier New', monospace;
    font-weight: 500;
    border: 3px solid #cccdce;
    padding-left: 8px;
    padding-right: 8px;
  }
</style>
