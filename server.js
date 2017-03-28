const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
})
