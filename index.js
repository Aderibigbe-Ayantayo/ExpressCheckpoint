const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to check working hours
const workingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Sorry, the web application is only available during working hours (Monday to Friday, 9 to 17).</h1>');
  }
};

// Use middleware for all routes
app.use(workingHours);

// Serve static files
app.use(express.static('public'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
