const fs = require('fs')
const yargs = require('yargs')

const HeaderStr = '#!/usr/bin/env node\n'

const args = yargs.command('*', 'add-header [src] [dist]').option('-c', {
  describe: 'config file path',
  type: 'string'
}).argv

if (args._.length <= 1) {
  throw new Error('no src or dist path ')
}

try {
  const headerStr = args.c != null ? fs.readFileSync(args.c, { encoding: 'utf8' }) : HeaderStr

  const [src, dist] = args._

  const srcStream = fs.createReadStream(src, 'utf8')
  const destStream = fs.createWriteStream(dist, 'utf8')
  destStream.on('open', () => {
    const chunk = Buffer.from(headerStr, 'utf8')
    destStream.write(chunk)
  })

  srcStream.on('data', (chunk) => destStream.write(chunk))
  srcStream.on('end', () => destStream.end())
} catch (err) {
  throw new Error(err)
}
