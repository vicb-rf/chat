require('dotenv').config();
const express = require('express');
const app = express();

const path = require('path');
const cors = require('cors')

const publicPath = path.resolve(__dirname + '/public');

//middleware
app.use(cors());
app.use(express.static(publicPath));

console.log(publicPath);

app.use('*', (req, res) => {
  return res.status(404).json({ msg: 'Endpoint no existe'})
});

app.listen(process.env.PORT, () => {
  console.log('Server OK, on port', process.env.PORT);
});