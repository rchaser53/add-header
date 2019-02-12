## how to install

```
$ npm install add-text-header
```


## how to use

```
$ add-text-header src dist
```

## example

```
$ cat index.js
console.log('test');

$ add-text-header index.js dist/index.js
$ cat dist/index.js
#!/usr/bin/env node
console.log('test');

```