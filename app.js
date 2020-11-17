const express = require('express');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./routes/authRoutes');

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
	'mongodb+srv://Christian:christian001@cluster.qxk0k.gcp.mongodb.net/node-auth';
mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(result => app.listen(3000))
	.catch(err => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use(authRoutes);
