const express = require('express');
const app = express();

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  someAsyncOperation().then(() => {
    res.send('Hello');
  }).catch(err => {
    // Error is handled by the middleware
    next(err);
  });
});

function someAsyncOperation() {
  // Simulate an asynchronous operation that might fail
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate an error
      reject(new Error('Something went wrong!'));
      // resolve();
    }, 1000);
  });
}

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});