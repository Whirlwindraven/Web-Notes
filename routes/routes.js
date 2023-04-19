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
    app.get('/api/notes', (request, response) => {
        response.json(noteList);
      });
      
    app.post('/api/notes', async (request, response) => {
        const addedNote = request.body;
        noteList.push(addedNote);
        await saveToDatabase();
        return response.status(201).json({ message: 'Note added successfully' });
      });
      app.post('/api/notes', async (request, response) => {
        const addedNote = request.body;
        noteList.push(addedNote);
        await saveToDatabase();
        return response.status(201).json({ message: 'Note added successfully' });
      }); 
      app.get('/api/notes/:id', (request, response) => {
        response.json(noteList[request.params.id]);
      });
      app.delete('/api/notes/:id', async (request, response) => {
        noteList.splice(request.params.id, 1);
        await saveToDatabase();
        return response.json({ message: 'Note deleted successfully' });
      });
      app.get('/notes', (request, response) => {
        response.sendFile(filePath.join(__dirname, '../public/notes.html'));
      });
    
      app.get('*', (request, response) => {
        response.sendFile(filePath.join(__dirname, '../public/index.html'));
      });
      