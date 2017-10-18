const Record    = require('./Record.js')
const tools     = require('./tools.js')

const args              = process.argv.slice(2)
const amountOfArguments = args.length

if (amountOfArguments != 3) {
    console.log("Usage: 3 arguments. Filename, timestamp 1, timestamp 2. The timestamps are an interval.")
    process.exit(1)
}

const filename       = args[0]
const timestampBegin = args[1]
const timestampEnd   = args[2]

tools
.loadContentsOfAFileAndPresent(filename, new Date(timestampBegin), new Date(timestampEnd))