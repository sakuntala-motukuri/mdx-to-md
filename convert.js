const fs = require('fs');
const path = require('path');

// Function to convert MDX to MD
function convertMdxToMd(inputFile, outputFile) {
    // Read the MDX file
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${inputFile}:`, err);
            return;
        }

        // Remove JSX components (basic regex)
        const mdContent = data.replace(/<[^>]+>/g, ''); // Removes all HTML-like tags

        // Write the cleaned content to the MD file
        fs.writeFile(outputFile, mdContent, (err) => {
            if (err) {
                console.error(`Error writing file ${outputFile}:`, err);
            } else {
                console.log(`Successfully converted ${inputFile} to ${outputFile}`);
            }
        });
    });
}

// Function to convert all .mdx files in a directory
function convertAllMdxFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${directory}:`, err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file) === '.mdx') {
                const inputFile = path.join(directory, file);
                const outputFile = path.join(directory, path.basename(file, '.mdx') + '.md');
                convertMdxToMd(inputFile, outputFile);
            }
        });
    });
}

// Usage
const directory = path.join(__dirname); // Current directory
convertAllMdxFiles(directory);