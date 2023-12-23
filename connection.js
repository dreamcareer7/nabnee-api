const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nabnee', { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.once('open', () => {
  mongoose.set('useFindAndModify', false);
  console.log('Connection has been made ');
}).on('error', (error) => {
  console.log('Connection has Error', error);
});
