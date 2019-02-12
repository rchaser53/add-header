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
  const input = fs.readFileSync(src, { encoding: 'utf8' })
  fs.writeFileSync(dist, `${headerStr}${input}`, { encoding: 'utf8' })
} catch (err) {
  throw new Error(err)
}
