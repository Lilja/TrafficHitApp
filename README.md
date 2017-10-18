# Traffic hit app

Small application that will read traffic hits from a CSV-formated file and displays the information for every hit endpoint.
The program runs asynchrounously and uses streams to read from disk, so large CSV-files is capable of being run.

## Prerequirements
`NodeJS` - tested with v6.11.4

`npm`    - tested with v3.10.10

## Building the app / Downloading the dependecies
```shell
$ npm install
```

## Running the app
```shell
$ node app.js <filename> <timestamp> <timestamp 2>
```

### Command line arguments
`filename` is the filename of a file to open. The program expects a file in CSV format with `;` as delimiter.

Example format:

`2017-01-01 12:00:00;/foo.html;12345`


`timestamp` and `timestamp 2` is a time interval that will filter out tracked information if it's not in the interval. Supported format is ISO-8601.

## Running unit tests
```shell 
$ ./node_modules/mocha/bin/mocha tests/
```
in root directory