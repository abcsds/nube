 var fs = require('fs')
 console.log(process.argv[3])
 var n = fs.readFileSync(process.argv[3]).toString().split().length
