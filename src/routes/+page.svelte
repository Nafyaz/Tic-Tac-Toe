<script lang="ts">
  import { Move } from "$lib/entities/move";
  import { findCompletedCells, updateCompletedCells } from "$lib/util";
  import { Direction } from "$lib/entities/direction";

  let cols = $state(3);
  let rows = $state(3);
  let grid: String[] = $state(Array.from({ length: rows * cols }, (_, i) => Move.NONE.toString()));

  let nextMove = $state("O");

  $effect(() => {
    grid = Array.from({ length: rows * cols }, (_, i) => Move.NONE.toString());
    nextMove = "O";
  });

  function handleClick(cell: number) {
    if (grid[cell] != Move.NONE.toString()) return;

    if (nextMove === "X") {
      grid[cell] = Move.X.toString();
      nextMove = "O";
    } else {
      grid[cell] = Move.O.toString();
      nextMove = "X";
    }

    let { completedCells, dir } = findCompletedCells(grid, rows, cols, cell);
    if (dir != Direction.NONE) {
      updateCompletedCells(grid, completedCells, dir);
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
      <div class="grid bg-black" style="grid-template-columns: repeat({cols}, 1fr);">
        {#each Array.from({ length: cols * rows }) as item, i}
          <button class="h-16 w-16 border-2 bg-white" onclick={() => handleClick(i)}>
            <img src={`/assets/${grid[i]}.png`} alt={grid[i]} />
          </button>
        {:else}
          <div class="p-8 bg-white">Invalid!</div>
        {/each}
      </div>
    </div>
  </div>
</div>
