let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cors = require('cors');
let index = require('./routes/routes');
let app = express();

app.use(cors());
app.use('/img_directory',express.static('img_directory'));

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json({limit:'5mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));
app.use('/assets',express.static('assets'));

app.use('/', index);

// catch 404 and forward to error handler
app.use((_req, _res, next)=> {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next)=> {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

const server=app.listen(process.env.PORT || 4000,()=> {
    console.log('Server listening on port',process.env.PORT || server.address().port);
});

module.exports = app;
