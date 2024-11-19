const express = require('express');
const mysql = require('mysql2');
const path = require('path');
//const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MyNewPass',
  database: 'camping',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define API routes for CRUD operations (Create, Read, Update, Delete)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
  });
  app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); 
  });
  app.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'register.html')); 
  });
  app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html')); 
  });
  app.get('/reviews.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'reviews.html')); 
  });
  app.get('/blog.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html')); 
  });
  app.get('/plan.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'plan.html')); 
  });
  app.get('/blog1post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog1post.html')); 
  });
  app.get('/blog2post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog2post.html')); 
  });
  app.get('/blog3post.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog3post.html')); 
  });
  app.get('/addtocartplan.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'addtocartplan.html')); 
  });
  app.get('/viewcart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewcart.html')); 
  });
  app.get('/shop.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'shop.html')); 
  });
  app.get('/addtocartshop.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'addtocartshop.html')); 
  });
  app.get('/addareview.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'addareview.html')); 
  });

  app.use(express.urlencoded({ extended: false }));

  app.post('/register', (req, res) => {
    const { name, email,phone,password } = req.body;
  
    
  
      const insertQuery = 'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, email,phone,password], (err, result) => {
        if (err) {
          console.error('Error creating user: ', err);
          res.status(500).json({ error: 'Unable to create user' });
        } else {
          res.status(201).json({ message: 'User created successfully' });
        }
      });
    });

    app.post('/addtocart', (req, res) => {
      const { name, password, campingsite } = req.body;
  
      // Check if the user exists in the "users" table
      const checkUserQuery = 'SELECT * FROM users WHERE name = ? AND password = ?';
      db.query(checkUserQuery, [name, password], (err, userResults) => {
          if (err) {
              console.error('Error checking user: ', err);
              res.status(500).json({ error: 'Unable to check user' });
          } else if (userResults.length === 0) {
              // User not found in the "users" table
              const errorMessage = 'User not registered or invalid credentials';
            res.status(401).json({ message: 'User not registered or invalid credentials' });
          } else {
              // User found in the "users" table
              // Insert the user's data into the "bookings" table
              const insertBookingQuery = 'INSERT INTO bookings (name, password, campingsite) VALUES (?, ?, ?)';
              db.query(insertBookingQuery, [name, password, campingsite], (err, bookingResult) => {
                  if (err) {
                      console.error('Error creating booking: ', err);
                      res.status(500).json({ error: 'Unable to create booking' });
                  } else {
                      res.status(201).json({ message: 'Booking successful' });
                  }
              });
          }
      });
  });
  

  app.post('/getviewcart', (req, res) => {
    const { name, password } = req.body;

    // Check if the user exists in the "users" table
    const checkUserQuery = 'SELECT * FROM users WHERE name = ? AND password = ?';
    db.query(checkUserQuery, [name, password], (err, userResults) => {
        if (err) {
            console.error('Error checking user: ', err);
            res.status(500).json({ error: 'Unable to check user' });
        } else if (userResults.length === 0) {
            // User not found in the "users" table
            res.status(200).json({ message: 'No results' });
        } else {
            // User found in the "users" table, so fetch campingsites
            const getCampingSitesQuery = 'SELECT campingsite FROM bookings WHERE name = ? AND password = ?';
            db.query(getCampingSitesQuery, [name, password], (err, campingsiteResults) => {
                if (err) {
                    console.error('Error fetching campingsites: ', err);
                    res.status(500).json({ error: 'Unable to fetch campingsites' });
                } else {
                    // Campingsites found for the user
                    const campingsites = campingsiteResults.map((result) => result.campingsite);
                    res.status(200).json({ campingsites: campingsites });
                }
            });
        }
    });
});


app.post('/addareview', (req, res) => {
  const reviewData = req.body;

  const insertReviewQuery = 'INSERT INTO reviews (name, campsitename, state, country, comments, activities, rating) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
      reviewData.name,
      reviewData.campsiteName,
      reviewData.state,
      reviewData.country,
      reviewData.comments,
      reviewData.activities,
      reviewData.rating
  ];

  db.query(insertReviewQuery, values, (err, result) => {
      if (err) {
          console.error('Error inserting review: ', err);
          res.status(500).json({ message: 'Failed to add the review' });
      } else {
          console.log('Review added to the database');
          res.json({ message: 'Review added successfully' });
      }
  });
});

  



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
