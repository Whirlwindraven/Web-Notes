const fileSystem = require('fs').promises;
const filePath = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = async app => {
  let noteArray;
  try {
    const fileData = await fileSystem.readFile('db/db.json', 'utf-8');
    noteArray = JSON.parse(fileData);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  app.get('/api/notes', (request, response) => {
    response.json(noteArray);
  });

  app.post('/api/notes', async (request, response) => {
    const addedNote = request.body;
    addedNote.id = uuidv4(); // This will assign a unique id to the note
    noteArray.push(addedNote);
    await syncDb();
    return response.status(201).json({ message: 'Note added successfully' });
  });

  app.get('/api/notes/:id', (request, response) => {
    response.json(noteArray.find(note => note.id === request.params.id));
  });

  app.delete('/api/notes/:id', async (request, response) => {
    noteArray = noteArray.filter(note => note.id !== request.params.id);
    await syncDb();
    return response.json({ message: 'Note deleted successfully' });
  });

  app.get('/notes', (request, response) => {
    response.sendFile(filePath.join(__dirname, '../public/notes.html'));
  });

  app.get('*', (request, response) => {
    response.sendFile(filePath.join(__dirname, '../public/index.html'));
  });

  // Updates JSON file based on note interactions 
  async function syncDb() {
    try {
      await fileSystem.writeFile('db/db.json', JSON.stringify(noteArray, null, 2));
      console.log('Database updated successfully');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
