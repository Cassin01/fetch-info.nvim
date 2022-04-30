import { Denops } from "https://deno.land/x/denops_std@v2.0.0/mod.ts";


export async function main(denops: Denops): Promise<void> {
  const city = await fetch('https://ipinfo.io/city');
  const city_text = await city.text();
  denops.dispatcher = {
    foo() {
      return Promise.resolve("foo");
    },
    async c() { const tmp = await fetch('http://wttr.in/'.concat(city_text, '?format=%c'))
      return await tmp.text();
    },
    async m() { const tmp = await fetch('http://wttr.in/'.concat(city_text, '?format=%m'))
      return await tmp.text();
    },
    async f() { const tmp = await fetch('http://wttr.in/'.concat(city_text, '?format=%f'))
      return await tmp.text();
    },
    async w() {const tmp =  await fetch('http://wttr.in/'.concat(city_text, '?format=%w'))
      return await tmp.text();
    },
    async showinfo(text: unknown) {
      await denops.cmd("echomsg text", {
        text,
      });
    },
  }
  const n = denops.name;
  await denops.cmd(
      `command! GInfoF call denops#notify("${n}", "showinfo", [denops#request("${n}", "w", [])])`
  );
};

/**
  * INFO
* call denops#request("fetch-info", "f", [])
* call denops#notify("fetch-info")
* lua print(vim.inspect(vim.api.nvim_exec([[call denops#request_async("fetch-info", "wttr", [], )]], true)))
*/
