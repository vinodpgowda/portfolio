const fs = require('fs');
const path = require('path');

// Function to process HTML files
function processHtml(isProd) {
    const baseUrl = isProd 
        ? 'https://vinodpgowda.github.io/portfolio/'
        : '/';
    
    // Get all HTML files recursively
    function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory() && !file.includes('node_modules')) {
                getAllHtmlFiles(filePath, arrayOfFiles);
            } else if (path.extname(file) === '.html') {
                arrayOfFiles.push(filePath);
            }
        });

        return arrayOfFiles;
    }

    const htmlFiles = getAllHtmlFiles('.');

    htmlFiles.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update or add base tag
        if (content.includes('<base href=')) {
            content = content.replace(
                /<base href=["'].*?["']/,
                `<base href="${baseUrl}"`
            );
        } else {
            content = content.replace(
                '<head>',
                `<head>\n    <base href="${baseUrl}">`
            );
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`Processed: ${filePath}`);
    });
}

// Check if running in production mode
const isProd = process.argv.includes('--prod');
processHtml(isProd);
console.log(`Paths set for ${isProd ? 'production' : 'development'}`);