const fs                    = require('fs')
const Record                = require('./Record.js')
const RecordValidator       = require('./RecordValidator.js')
const {Option, option, some, none}  = require("ts-option")
const _                     = require('lodash')
var EOL                   = require('os').EOL

function createPresentString(records) {
    var str = "url | page hits | unique visitors" + EOL
    Object.keys(records).forEach( url => {
        const pageHits  = records[url].length
        const visitors  = _.uniqBy(records[url], record => {
            return record.userid
        }).length
        str += url + " " + pageHits + " " + visitors + EOL
    })
    return str;
}

function presentRecords(output) {
    console.log(output)
}

function lineToRecordOption (line) {
    const csvLine = RecordValidator.csvLineToArray(line)

    if (RecordValidator.isCsvValid(csvLine) && RecordValidator.isRecordValid(csvLine)) {
        return some(RecordValidator.arrayToRecord(csvLine))
    } else {
        return none
    }
}

function filterRecordsBasedOnTimestamp(records, timestampStart, timestampEnd) {
    return records.filter( record =>
        (timestampStart.getTime() <= record.timestamp.getTime()) &&
        (record.timestamp.getTime() <= timestampEnd.getTime())
    )
}

function groupRecordsByUrl(records) {
    return _.groupBy(records, (record) => {
        return record.url
    })   
}

function loadContentsOfAFileAndPresent(filePath, timestampStart, timestampEnd) {
    var records = []

    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(filePath)
    })

    lineReader
    .on('line', function (line) {
        const recordOpt = lineToRecordOption(line)

        if (recordOpt.isDefined) {
            records.push(recordOpt.get)
        }
    })

    lineReader
    .on('close', () => {
        const newRecords            = filterRecordsBasedOnTimestamp(records, timestampStart, timestampEnd)
        const recordsGroupedByUrl   = groupRecordsByUrl(newRecords) 

        presentRecords(createPresentString(recordsGroupedByUrl))
    })
}

module.exports = {
    loadContentsOfAFileAndPresent: loadContentsOfAFileAndPresent,
    createPresentString: createPresentString,
    presentRecords: presentRecords,
    lineToRecordOption: lineToRecordOption,
    filterRecordsBasedOnTimestamp: filterRecordsBasedOnTimestamp,
    groupRecordsByUrl: groupRecordsByUrl,
}