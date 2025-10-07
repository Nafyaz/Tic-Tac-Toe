<script lang="ts">
  let cols = $state(3);
  let rows = $state(3);
  let grid: string[][] = $state([[]]);

  $effect(() => {
    grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ""));
  });

  let nextMove = $state("O");

  function handleClick(i: number) {
    if (nextMove === "X") {
      nextMove = "O";
    } else {
      nextMove = "X";
    }
  }
</script>

<div class="flex min-h-screen flex-col">
  <div class="m-8 flex justify-center gap-4">
    <div>
      Columns: <input bind:value={cols} />
    </div>
    <div>
      Rows: <input bind:value={rows} />
    </div>
  </div>

  <div class="flex justify-center bg-gray-100 p-4">
    <div class="content-center">
      <div class="grid gap-1 bg-black" style="grid-template-columns: repeat({cols}, 1fr);">
        {#each Array.from({ length: cols * rows }) as item, i}
          <button class="bg-white p-8" onclick={() => console.log(grid[0][0])}>
            {grid[0][0]}
          </button>
        {:else}
          <div class="p-8 bg-white">Invalid!</div>
        {/each}
      </div>
    </div>
  </div>
</div>
