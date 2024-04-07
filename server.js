const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/redirect', (req, res) => {
  const code = req.query.code;
  if (code) {
    res.redirect(`com.ovadrive.app:/oauth2redirect?code=${code}`);
  } else {
    res.status(400).send('No code found in request');
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
