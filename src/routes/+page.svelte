<script lang="ts">
  import { Move } from "$lib/entities/move";
  import { findCompletedCells, updateCompletedCells } from "$lib/util";
  import { Direction } from "$lib/entities/direction";
  import * as Popover from "$lib/components/ui/popover";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";

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

<svelte:head>
  <title>Tic Tac Toe</title>
</svelte:head>

<!--TODO: Add responsiveness in everything-->
<div class="flex min-h-screen min-w-screen flex-col">
  <div class="flex justify-center">
    <div class="w-3/5 md:flex">
      <div class="m-8 w-1/3 content-center gap-4 md:flex">
        <div>
          <Label class="m-1" for="rows">Rows</Label>
          <Input class="w-32" bind:value={rows} />
        </div>
        <div>
          <Label class="m-1" for="cols">Cols</Label>
          <Input class="w-32" bind:value={cols} />
        </div>
      </div>

      <div class="m-8 w-1/3 content-center justify-center md:flex">
        <div class="flex items-center">
          <!--          TODO: Change font / size of ": {score[0]}"-->
          <img class="h-8 w-8" src="/assets/1.png" alt="O" />: {score[0]}
        </div>
        <div class="flex items-center">
          <img class="h-8 w-8" src="/assets/2.png" alt="X" />: {score[1]}
        </div>
      </div>

      <div class="m-8 w-1/3 items-center justify-end md:flex">
        <Popover.Root>
          <Popover.Trigger>
            <Button>Play With A Friend</Button>
          </Popover.Trigger>
          <Popover.Content class="w-80">
            <form method="POST">
              <div class="grid grid-cols-2 gap-x-2 gap-y-3">
                <div>
                  <Label class="m-1" for="rows">Rows</Label>
                  <Input name="rows" type="number" value="3" />
                </div>
                <div>
                  <Label class="m-1" for="cols">Cols</Label>
                  <Input name="cols" type="number" value="3" />
                </div>

                <div class="col-span-2">
                  <Label class="py-3" for="who-starts">Who Will Start?</Label>
                  <RadioGroup.Root value="you" id="who-starts">
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="you" id="you" />
                      <Label for="you">You</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="friend" id="friend" />
                      <Label for="friend">Your Friend</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <RadioGroup.Item value="rand" id="rand" />
                      <Label for="rand">Random</Label>
                    </div>
                  </RadioGroup.Root>
                </div>

                <div class="col-span-2">
                  <Button type="submit" class="w-full">Generate Links</Button>
                </div>
              </div>
            </form>
          </Popover.Content>
        </Popover.Root>
      </div>
    </div>
  </div>

  <div class="flex justify-center bg-gray-100 p-4">
    <div class="content-center">
      {#if rows * cols > 0}
        <div class="grid" style="grid-template-columns: repeat({cols}, 1fr);">
          {#each Array.from({ length: cols * rows }) as item, i}
            <!--TODO: Button should have cursor-pointer only if grid[i] is Move.NONE.toString()-->
            <button class="h-16 w-16 cursor-pointer border-2 border-black bg-white" onclick={() => handleClick(i)}>
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
