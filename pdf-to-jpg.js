const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

async function convertFirstPageToJpg() {
    const downloadDir = './public/download';

    try {
        const files = await fs.readdir(downloadDir);

        for (const file of files) {
            if (file.toLowerCase().endsWith('.pdf')) {
                const pdfPath = path.join(downloadDir, file);
                const jpgFilename = path.basename(file, '.pdf') + '.jpg';
                const jpgPath = path.join(downloadDir, jpgFilename);

                try {
                    const command = `pdftoppm -jpeg -f 1 -singlefile "${pdfPath}" "${path.join(downloadDir, path.basename(file, '.pdf'))}"`;

                    await execPromise(command);

                    console.log(`Convertido: ${file} -> ${jpgFilename}`);
                } catch (error) {
                    console.error(`Error al convertir ${file}: ${error.message}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error al leer la carpeta: ${error.message}`);
    }
}

convertFirstPageToJpg();