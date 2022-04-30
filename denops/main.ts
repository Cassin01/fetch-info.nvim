import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
      hello() {
          return Promise.resolve("Hello");
      }
  }
};
