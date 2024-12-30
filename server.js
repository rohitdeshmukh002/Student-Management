// const jsonServer = require('json-server');
// const path = require('path');

// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, 'db.json')); // Path to your db.json
// const middlewares = jsonServer.defaults();

// server.use(middlewares);

// server.use((req, res, next) => {
//   if (req.method === 'POST' && req.body.id === undefined) {
//     const db = router.db;
//     const students = db.get('students').value();
//     const lastId = students.length > 0 ? students[students.length - 1].id : 0;
//     req.body.id = lastId + 1;  
//   }
//   next();
// });

// server.use(router);

// server.listen(3000, () => {
//   console.log('JSON Server is running on http://localhost:3000');
// });
