const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
//middleware

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log file');
    }
  });
  console.log();
  next();
});

// app.use((req, res, next) => {
//   //res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

//helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamit', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.get("/", (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My New Home Page',
    welcomeMessage: 'Welcome to my website!!!'

  });
});



app.get("/about", (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'My New About Page'

  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});
app.listen(3000, () => {
  console.log('The server is up and running on Port 3000');
});
