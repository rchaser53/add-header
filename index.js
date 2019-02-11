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
  const srcStream = fs.createReadStream(src, 'utf8');
  const destStream = fs.createWriteStream(dist, 'utf8');
  destStream.on('open', () => {
    const chunk = Buffer.from(HeaderStr, 'utf8')
    destStream.write(chunk)
  })
  
  srcStream.on('data', chunk => destStream.write(chunk));
  srcStream.on('end', () => destStream.end());
} catch (err) {
  throw new Error(err);
}
