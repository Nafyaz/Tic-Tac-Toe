<script lang="ts">
  import { Move } from "$lib/entities/move";
  import { findCompletedCells, updateCompletedCells } from "$lib/util";
  import { Direction } from "$lib/entities/direction";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let rows = $state(3);
  let cols = $state(3);
  let grid: string[] = $state(Array.from({ length: rows * cols }, (_, i) => Move.NONE.toString()));
  let score = $state([0, 0]);

  let nextMove = $state("O");

  $effect(() => {
    grid = Array.from({ length: rows * cols }, (_, i) => Move.NONE.toString());
    nextMove = "O";
    score = [0, 0];
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

      if (nextMove === "X") {
        score[0]++;
      } else {
        score[1]++;
      }
    }
  }
</script>

<div class="flex min-h-screen min-w-screen flex-col">
  <div class="flex justify-center">
    <div class="flex w-3/5 justify-between">
      <div class="m-8 flex gap-4">
        <div>
          Rows: <Input class="w-32" bind:value={rows} />
        </div>
        <div>
          Columns: <Input class="w-32" bind:value={cols} />
        </div>
      </div>

      <div class="m-8 flex gap-4">
        <div class="flex items-center">
          <img class="h-8 w-8" src="/assets/1.png" alt="O" />: {score[0]}
        </div>
        <div class="flex items-center">
          <img class="h-8 w-8" src="/assets/2.png" alt="X" />: {score[1]}
        </div>
      </div>

      <div class="m-8">
        <Button>Play with your friend</Button>
      </div>
    </div>
  </div>

  <div class="flex justify-center bg-gray-100 p-4">
    <div class="content-center">
      {#if rows * cols > 0}
        <div class="grid" style="grid-template-columns: repeat({cols}, 1fr);">
          {#each Array.from({ length: cols * rows }) as item, i}
            <button class="h-16 w-16 border-2 border-black bg-white" onclick={() => handleClick(i)}>
              <img src={`/assets/${grid[i]}.png`} alt={grid[i]} />
            </button>
          {/each}
        </div>
      {:else}
        <div class="bg-white p-8">Invalid!</div>
      {/if}
    </div>
  </div>
</div>
