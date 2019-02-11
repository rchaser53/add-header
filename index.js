const fs = require("fs");
const yargs = require("yargs");

const HeaderStr = "#!/usr/bin/env node\n";

const args = yargs.command("*", "add-header [src] [dist]").option("-c", {
  describe: "config file path",
  type: "string"
}).argv;

if (args._.length <= 1) {
  throw new Error("no src or dist path ");
}
const [src, dist] = args._;

try {
  const targetStr = `${HeaderStr} ${fs.readFileSync(src, {
    encoding: "utf8"
  })}`;
  fs.writeFileSync(dist, targetStr, { encoding: "utf8" });
} catch (err) {
  throw new Error(err);
}
