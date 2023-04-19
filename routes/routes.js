const fileSystem = require('fs').promises;
const filePath = require('path');

// Initializing the module 
module.exports = async application => {
    //Reading and parsing the JSON file
    let noteList;
    try {
      const fileData = await fileSystem.readFile('db/db.json', 'utf-8');
      noteList = JSON.parse(fileData);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
    application.get('/api/notes', (request, response) => {
        response.json(noteList);
      });
      