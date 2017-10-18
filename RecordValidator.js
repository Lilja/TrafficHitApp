const Record = require('./Record.js')

module.exports =  {
    csvLineToArray: function(someStr) {
        return someStr.split(";")
    },
    arrayToRecord: function(array) {
        const record = new Record(array[0], array[1], array[2])
        return record
    },
    isCsvValid: function(maybeRecord) {
        return maybeRecord.length == 3
    },
    isRecordValid: function(array) {
        return Date.parse(array[0])
    }
}