const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { mongoDB } = require('./config');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = mongoDB.URI;
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

app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

//use jquery js as static route
app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist/'));

//use pagination js as static route
app.use(
	'/scripts',
	express.static(__dirname + '/node_modules/paginationjs/dist/')
);

//use pagination css as static route
app.use(express.static(__dirname + '/node_modules/paginationjs/dist/'));

// cookies
app.get('/set-cookies', (req, res) => {
	//res.setHeader('Set-Cookie', 'newUser=true');
	res.cookie('newUser', false);
	res.cookie('isEmployee', true, {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: true,
	});
	res.send('New cookie was setted');
});

app.get('/get-cookies', (req, res) => {
	const cookies = req.cookies;
	res.json(cookies);
});
