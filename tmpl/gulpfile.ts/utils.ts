const util = require("util");

export async function x(...args) {
  try {
    return await util.promisify(require("child_process").exec)(...args);
  } catch (e) {
    return e;
  }
}
export async function runMod(mod: string) {
  delete require.cache[require.resolve(mod)];
  try {
    require(mod);
  } catch (e) {
    console.log(e);
  }
}
