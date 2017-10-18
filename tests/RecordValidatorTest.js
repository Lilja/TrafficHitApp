
const assert = require('assert')
const RecordValidator  = require('../RecordValidator.js')
const Record = require('../Record.js')
const {Option, option, some, none}  = require("ts-option")

describe('RecordValidator', () => {
    describe('#csvLineToArray()', () => {
        it('should split a csv line to array', () => {
            assert(RecordValidator.csvLineToArray("2017-01-01 12:00:00;/foo.html;12345").length == 3)
        })
        it('should split an invalid csv line to array', () => {
            assert(RecordValidator.csvLineToArray("2017-01-01 12:00:00;/foo.html").length == 2)
        })
    })
    describe('#isCsvValid()', () => {
        it('should validate a valid csv line', () => {
            assert(
                RecordValidator.isCsvValid(RecordValidator.csvLineToArray("2017-01-01 12:00:00;/foo.html;12345"))
            )
        })
        it('should validate an invalid csv line', () => {
            assert(
                !RecordValidator.isCsvValid(RecordValidator.csvLineToArray("2017-01-01 12:00:00;/foo.html")),
                "Invalid CSV line was treated as valid"
            )
        })
    })
    describe('#arrayToRecord()', () => {
        it('should return properties of a record when valid', () => {
            assert(RecordValidator.arrayToRecord(RecordValidator.csvLineToArray("2017-01-01 12:00:00;/foo.html;12345")).url == "/foo.html")
        })
    })
    describe('#isRecordValid()', () => {
        it('should return properties of a record when valid', () => {
            const record = RecordValidator.csvLineToArray("2017-01-01 12:00:00;/foo.html;12345")
            assert(RecordValidator.isRecordValid(record))
        })
        it('should return fail when record of faulty timestamp is submited', () => {
            const record = RecordValidator.csvLineToArray("20a7-a1-0a 12:00:a0;/foo.html;12345")
            assert(!RecordValidator.isRecordValid(record))
        })
    })
})