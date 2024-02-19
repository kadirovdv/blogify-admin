const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ngrok = require('ngrok');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Hello express!")
})

// ngrok.connect({ addr: 5000, authtoken_from_env: true })
//   .then(listener => console.log(`Ingress established at: ${listener.url()}`));

module.exports = app;
