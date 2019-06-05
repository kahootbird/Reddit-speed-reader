const express = require('express')
const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.listen(80, () => {
  console.log('Example app listening on port 8000!')
});

