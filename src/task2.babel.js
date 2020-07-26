import {csv} from 'csvtojson';
import {createReadStream, createWriteStream} from 'fs';

const csvReader$ = createReadStream('./csv/nodejs-hw1-ex1.csv')
    .on('error', console.log);

const jsonWriter$ = createWriteStream('./json/nodejs-hw1-ex1.txt')
    .on('error', console.log);

const csvConverter$ = csv({
    ignoreColumns: /amount/i
}).on('error', console.log);

csvReader$
    .pipe(csvConverter$)
    .pipe(jsonWriter$);
