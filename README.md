## how to install

```
$ npm install add-text-header
```


## how to use

```
$ add-text-header src dist
```

## example

default

```
$ cat index.js
console.log('test');

$ add-text-header index.js dist/index.js
$ cat dist/index.js
#!/usr/bin/env node
console.log('test');

```

use custom string

```
$ cat LICENSE.text
/* this is a license */

$ add-text-header -c LICENSE.txt index.js dist/index.js
$ cat dist/index.js
/* this is a license */
console.log('test');

```
