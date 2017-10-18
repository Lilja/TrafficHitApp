'use strict';
class Record {
    constructor(timestamp, url, userid){
        this.timestamp  = new Date(timestamp)
        this.url        = url
        this.userid     = userid
    }
}

module.exports = Record