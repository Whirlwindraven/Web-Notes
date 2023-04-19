const fileSystem = require('fs').promises;
const filePath = require('path');

module.exports = async server => {
  let noteArray;
  try {
    const fileData = await fileSystem.readFile('db/db.json', 'utf-8');
    noteArray = JSON.parse(fileData);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  server.get('/api/notes', (request, response) => {
    response.json(noteArray);
  });

  server.post('/api/notes', async (request, response) => {
    const addedNote = request.body;
    noteArray.push(addedNote);
    await syncDb();
    return response.status(201).json({ message: 'Note added successfully' });
  });

  server.get('/api/notes/:id', (request, response) => {
    response.json(noteArray[request.params.id]);
  });

  server.delete('/api/notes/:id', async (request, response) => {
    noteArray.splice(request.params.id, 1);
    await syncDb();
    return response.json({ message: 'Note deleted successfully' });
  });

  server.get('/notes', (request, response) => {
    response.sendFile(filePath.join(__dirname, '../public/notes.html'));
  });

  server.get('*', (request, response) => {
    response.sendFile(filePath.join(__dirname, '../public/index.html'));
  });

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
