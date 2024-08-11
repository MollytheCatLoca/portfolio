const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 30MB in bytes
const OUTPUT_DIR = 'codeaux';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to get all relevant files
function getRelevantFiles() {
    const command = `find . -type f \\( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.css" -o -name "*.scss" \\) -not -path "./node_modules/*" -not -path "./public/*" -not -path "./${OUTPUT_DIR}/*"`;
    return execSync(command).toString().split('\n').filter(Boolean);
}

// Function to write content to files
function writeContentToFiles(files) {
    let fileIndex = 1;
    let currentFileSize = 0;
    let currentFile = fs.createWriteStream(path.join(OUTPUT_DIR, `project_contents_${fileIndex}.txt`));

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const contentSize = Buffer.byteLength(content, 'utf8');

        if (currentFileSize + contentSize > MAX_FILE_SIZE) {
            currentFile.end();
            fileIndex++;
            currentFile = fs.createWriteStream(path.join(OUTPUT_DIR, `project_contents_${fileIndex}.txt`));
            currentFileSize = 0;
        }

        currentFile.write(`File: ${file}\n\n${content}\n\n`);
        currentFileSize += contentSize;
    });

    currentFile.end();
}

// Main execution
const relevantFiles = getRelevantFiles();
writeContentToFiles(relevantFiles);

console.log(`Project contents have been split into multiple files in the '${OUTPUT_DIR}' directory.`);