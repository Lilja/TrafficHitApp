
const assert = require('assert')
const tools  = require('../tools.js')
const Record = require('../Record.js')
const {Option, option, some, none}  = require("ts-option")

function giveRecords() {
    var listOfRecords = []
    listOfRecords.push(new Record("2017-01-01 12:00:00", "/foo.html", "123"))
    listOfRecords.push(new Record("2017-01-02 12:00:00", "/foo.html", "123"))
    listOfRecords.push(new Record("2017-01-03 12:00:00", "/foo.html", "123"))
    listOfRecords.push(new Record("2017-01-04 12:00:00", "/foo.html", "123"))
    listOfRecords.push(new Record("2017-01-05 12:00:00", "/foo.html", "123"))

    return listOfRecords
}

describe('Tools', () => {
    describe('#lineToRecordOption', () => {
        it('should return some of an option when valid input', () => {
            const lineOfCSV     = "2017-01-01 12:00:00;/contact.html;123456789"
            const recordOption  = tools.lineToRecordOption(lineOfCSV)

            assert(recordOption.isDefined)
        })

        it('should return none of an option when invalid input', () => {
            // Notice only 1 semicolon
            const lineOfCSV     = "2017-01-01 12:00:00;/contact.html"
            const recordOption  = tools.lineToRecordOption(lineOfCSV)

            assert(!recordOption.isDefined)
        })

    })

    describe('#filterRecordsByTimestamp', () => {
        it('should return 2 filtered records with a timestamp interval', () => {
            const listOfRecords = giveRecords()
            const timestampBegin = new Date("2017-01-02 13:00:00")
            const timestampEnd  = new Date("2017-01-04 13:00:00")
            const filteredRecords = tools.filterRecordsBasedOnTimestamp(listOfRecords, timestampBegin, timestampEnd)
            console.log(filteredRecords.length)
            assert(filteredRecords.length == 2, "filtered records was not 2")
        })
        
    })
    describe('#createPresentString', () => {
        it('should present "foo.html | 6 | 2"', () => {
            const obj = { "foo.html": [
                new Record('2017-01-01 12:00:00', "foo.html", "12345"),
                new Record('2017-01-02 12:00:00', "foo.html", "12345"),
                new Record('2017-01-03 12:00:00', "foo.html", "12345"),
                new Record('2017-01-04 12:00:00', "foo.html", "12346"),
                new Record('2017-01-05 12:00:00', "foo.html", "12346"),
                new Record('2017-01-06 12:00:00', "foo.html", "12346")
            ]}
            assert(tools.createPresentString(obj).indexOf("foo.html 6 2") > 0)
        })
        it('should present "bar.html | 1 | 1"', () => {
            const obj = { "foo.html": [
                new Record('2017-01-01 12:00:00', "foo.html", "12345"),
                new Record('2017-01-02 12:00:00', "foo.html", "12345"),
                new Record('2017-01-03 12:00:00', "foo.html", "12345"),
                new Record('2017-01-04 12:00:00', "foo.html", "12346"),
                new Record('2017-01-05 12:00:00', "foo.html", "12346"),
                new Record('2017-01-06 12:00:00', "foo.html", "12346")
            ], "bar.html": [
                new Record('2017-01-06 12:00:00', "bar.html", "12346")
            ]}

            assert(tools.createPresentString(obj).indexOf("bar.html 1 1") > 0)
        })

    })
})