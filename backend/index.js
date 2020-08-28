
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
<<<<<<< Updated upstream
  return res.send('API V2 ERPPLUS WORKING');
=======
  return res.send('API ERPPLUS WORKING');
>>>>>>> Stashed changes
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`API iniciada, puerto ${port}`);
<<<<<<< Updated upstream
});
=======
});
>>>>>>> Stashed changes
