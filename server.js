if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/', indexRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('connected to mongoose'));

app.use('/authors', authorsRouter);

app.listen(process.env.PORT || 3000);
