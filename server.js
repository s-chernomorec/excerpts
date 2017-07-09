const path = require('path');
const express = require('express');
const compression = require('compression');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3037;

const publicPath = path.resolve(__dirname, 'dis');

const app = express();

app.use(compression());

app.set('views', __dirname);
app.set('view engine', 'pug');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
	res.render('index');
//	res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`);
});
