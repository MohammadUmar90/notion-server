// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();
// app.use(express.json());

// app.post('/api/exchange_token', async (req, res) => {
//   const code = req.body.code;
//   const clientId = '5160eb77-b490-49ec-a4be-db702bb0a1bb';
//   const clientSecret = 'secret_FiSK7g3jj1YwNcl03UmRWFp5Lnr3QmO0NggnaEBjbfY';
//   const response = await fetch('https://api.notion.com/v1/oauth/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: 'https://notion-server-two.vercel.app/oauth/callback',
//       client_id: clientId,
//       client_secret: clientSecret,
//     }),
//   });

//   const data = await response.json();
//   if (data.access_token) {
//     // Send the access token back to the Flutter app or handle it as needed
//     // res.json({ token: data.access_token });
//     res.redirect(`myappoauth://callback?token=${data.access_token}`);

//   } else {
//     // Handle error
//     res.status(400).send('Failed to exchange token');
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/exchange_token', async (req, res) => {
  const code = req.body.code;
  const clientId = '5160eb77-b490-49ec-a4be-db702bb0a1bb';
  const clientSecret = 'secret_FiSK7g3jj1YwNcl03UmRWFp5Lnr3QmO0NggnaEBjbfY';

  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  
  const response = await fetch('https://api.notion.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://notion-server-two.vercel.app/oauth/callback',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json();
  if (data.access_token) {
    res.redirect(`myappoauth://callback?token=${data.access_token}`);
  } else {
    res.status(400).send('Failed to exchange token');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
