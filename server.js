require('dotenv').config();
const express = require('express');
const { connectToDb } = require('./db.js');
const { installHandler } = require('./api_handler.js');
const auth = require('./auth.js');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());
app.use('/auth', auth.routes);

installHandler(app);

// app.use(express.static('public'));
// const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
// console.log('CORS setting:', enableCors);
// server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

const port = process.env.PORT || 3000;
(async function start() {
	try {
		await connectToDb();
		app.listen(port, () => {
			console.log(`API server started on port ${port}`);
		});
	} catch (err) {
		console.log('ERROR:', err);
	}
}());
