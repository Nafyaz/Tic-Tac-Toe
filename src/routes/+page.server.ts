import type { Actions } from "./$types";

export const actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const rows = data.get("rows");
    const cols = data.get("cols");
    const whoStarts = data.get("who-starts");

    console.log(rows, cols, whoStarts);
  }
} satisfies Actions;
