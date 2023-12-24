const fs = require('fs')
const { promisify } = require('util');
const convert = require('heic-convert');
 
const heicToPng = () => {
   // read all files from input directory
   fs.readdir(`${__dirname}/input`,(err, filenames) => {
      filenames.forEach((fileName, index) => {
         (async () => {
            const inputBuffer = await promisify(fs.readFile)(`${__dirname}/input/${fileName}`);
            const outputBuffer = await convert({
               buffer: inputBuffer, // the HEIC file buffer
               format: 'PNG'        // output format
            });
            await promisify(fs.writeFile)(`${__dirname}/output/${fileName.split('.HEIC')[0]}.png`, outputBuffer);
          })();
      })
   })
}

heicToPng()