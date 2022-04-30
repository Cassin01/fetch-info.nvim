import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";


export async function main(denops: Denops): Promise<void> {
  const city = await fetch('https://ipinfo.io/city');
  const city_text = await city.text();
  denops.dispatcher = {
    async c() { await fetch('http://wttr.in/'.concat(city_text, '?format=%c'))},
    async m() { await fetch('http://wttr.in/'.concat(city_text, '?format=%m'))},
    async f() { await fetch('http://wttr.in/'.concat(city_text, '?format=%f'))},
    async w() { await fetch('http://wttr.in/'.concat(city_text, '?format=%w'))},
  }
};

/**
  * INFO
* call denops#notify("fetch-info", "f", [])
* lua print(vim.inspect(vim.api.nvim_exec([[call denops#request_async("fetch-info", "wttr", [], )]], true)))
*/
