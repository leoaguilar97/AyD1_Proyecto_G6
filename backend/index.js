
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  return res.send('API V2 ERPPLUS WORKING');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`API iniciada, puerto ${port}`);
});
