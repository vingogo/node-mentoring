const { csv } = require("csvtojson");
const fs = require("fs");

const csvReader$ = fs
  .createReadStream("./csv/nodejs-hw1-ex1.csv")
  .on("error", console.log);
const jsonWriter$ = fs
  .createWriteStream("./json/nodejs-hw1-ex1.txt")
  .on("error", console.log);
const csvConverter$ = csv({
  ignoreColumns: /amount/i,
}).on("error", console.log);

csvReader$.pipe(csvConverter$).pipe(jsonWriter$);
