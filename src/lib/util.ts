import { Direction } from "$lib/entities/direction";
import { Position } from "$lib/entities/position";

export function findCompletedCells(grid: string[], rows: number, cols: number, cell: number) {
  const r = Math.floor(cell / cols);
  const c = cell % cols;

  // For 000 degree
  for (let dcStart = -2; dcStart <= 0; dcStart++) {
    const matchedCells = [];

    for (let dc = dcStart; dc < dcStart + 3; dc++) {
      const newC = c + dc;
      const newCell = r * cols + newC;
      if (isValid(rows, cols, r, newC) && grid[cell] === grid[newCell]) {
        matchedCells.push(newCell);
      }
    }

    if (matchedCells.length === 3) {
      return { completedCells: matchedCells, dir: Direction.Right };
    }
  }

  // For 045 degree
  for (let dStart = -2; dStart <= 0; dStart++) {
    const matchedCells = [];

    for (let d = dStart; d < dStart + 3; d++) {
      const newR = r - d;
      const newC = c + d;
      const newCell = newR * cols + newC;

      if (isValid(rows, cols, newR, newC) && grid[cell] === grid[newCell]) {
        matchedCells.push(newCell);
      }
    }

    if (matchedCells.length === 3) {
      return { completedCells: matchedCells, dir: Direction.UP_RIGHT };
    }
  }

  // For 090 degree
  for (let drStart = 2; drStart >= 0; drStart--) {
    const matchedCells = [];

    for (let dr = drStart; dr > drStart - 3; dr--) {
      const newR = r + dr;
      const newCell = newR * cols + c;
      if (isValid(rows, cols, newR, c) && grid[cell] === grid[newCell]) {
        matchedCells.push(newCell);
      }
    }

    if (matchedCells.length === 3) {
      return { completedCells: matchedCells, dir: Direction.UP };
    }
  }

  // For 135 degree
  for (let dStart = 2; dStart >= 0; dStart--) {
    const matchedCells = [];

    for (let d = dStart; d > dStart - 3; d--) {
      const newR = r + d;
      const newC = c + d;
      const newCell = newR * cols + newC;

      if (isValid(rows, cols, newR, newC) && grid[cell] === grid[newCell]) {
        matchedCells.push(newCell);
      }
    }

    if (matchedCells.length === 3) {
      return { completedCells: matchedCells, dir: Direction.UP_LEFT };
    }
  }

  return { completedCells: [], dir: Direction.NONE };
}

export function updateCompletedCells(grid: string[], cells: number[], dir: Direction) {
  grid[cells[0]] += dir.toString() + Position.START.toString();
  grid[cells[1]] += dir.toString() + Position.MIDDLE.toString();
  grid[cells[2]] += dir.toString() + Position.END.toString();
}

function isValid(rows: number, cols: number, r: number, c: number) {
  return r >= 0 && r < rows && c >= 0 && c < cols;
}
