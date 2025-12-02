import { z } from "zod";

export const CreateGameSchema = z.object({
  rows: z.int().min(3).max(100),
  cols: z.int().min(3).max(100),
  whoStarts: z.enum(["you", "friend", "rand"])
});

export type CreateGameSchemaType = z.infer<typeof CreateGameSchema>;
