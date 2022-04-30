import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";


  export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    hello() {
      return Promise.resolve("Hello");
    },
    async wttr() {
      const city = await fetch('https://ipinfo.io/city');
      // const region = await fetch('https://ipinfo.io/region');
      const city_text = await city.text();
      const c = async () => await fetch('http://wttr.in/'.concat(city_text, '?format=%c'));
      const m = async () => await fetch('http://wttr.in/'.concat(city_text, '?format=%m'));
      const f = async () => await fetch('http://wttr.in/'.concat(city_text, '?format=%f'));
      const w = async () => await fetch('http://wttr.in/'.concat(city_text, '?format=%w'));
      return {c: c, m: m, f: f, w: w};
    }
  }
  await denops.cmd(`function! Meow() echom "Meow! endfunction"`);
};

/**
  * INFO
* call denops#notify("fetch-info", "hello", [])
* lua print(vim.inspect(vim.api.nvim_exec([[call denops#request_async("fetch-info", "wttr", [], )]], true)))
*/
