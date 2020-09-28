import { csv } from "csvtojson";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline, Transform } from "stream";
import { EOL } from "os";

const jsonTransformer = new Transform({
  transform(data, encoding, callback) {
    try {
      const parsedRow = JSON.parse(data);
      const formattedRow = Object.entries(parsedRow).reduce(
        (acc, [key, value]) =>
          Object.assign({}, acc, {
            [key.toLowerCase()]: value,
          }),
        {}
      );
      const formattedBuffer = Buffer.from(
        `${JSON.stringify(formattedRow)}${EOL}`
      );
      callback(null, formattedBuffer);
    } catch (e) {
      callback(e);
    }
  },
});

const csvReader$ = createReadStream(
  path.resolve(__dirname, "../csv/nodejs-hw1-ex1.csv")
).on("error", console.log);

const jsonWriter$ = createWriteStream(
  path.resolve(__dirname, "../json/nodejs-hw1-ex1.txt")
).on("error", console.log);

const csvConverter$ = csv({
  ignoreColumns: /amount/i,
}).on("error", console.log);

pipeline(csvReader$, csvConverter$, jsonTransformer, jsonWriter$);
