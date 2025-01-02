const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// PUT Endpoint to Edit Instructor
server.put('/instructors/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);  // Ensure 'id' is an integer
  const updatedInstructor = req.body;

  const instructors = router.db.get('instructors').value();
  const index = instructors.findIndex((ins) => ins.id === id);

  if (index !== -1) {
    // Update the instructor
    router.db.get('instructors').get(index).assign(updatedInstructor).write();
    res.status(200).send(updatedInstructor);  // Send the updated instructor as response
  } else {
    res.status(404).send({ error: 'Instructor not found' });
  }
});

// DELETE Endpoint to Delete Instructor
server.delete('/instructors/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);  // Ensure 'id' is an integer
  const instructors = router.db.get('instructors').value();

  const index = instructors.findIndex((ins) => ins.id === id);

  if (index !== -1) {
    // Remove the instructor from the array
    router.db.get('instructors').remove({ id }).write();
    res.status(200).send({ success: true });
  } else {
    res.status(404).send({ error: 'Instructor not found' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
