export interface CreateGameRequest {
  rows: number;
  cols: number;
  whoStarts: "you" | "friend" | "rand";
}
