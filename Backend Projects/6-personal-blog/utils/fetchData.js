const fsPromises = require('fs').promises;
const path = require('path');

const fetchData = async () => {
    const filePath = path.join(__dirname, '..', 'model', 'blogs.json');
    const data = await fsPromises.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

module.exports = fetchData;