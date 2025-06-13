const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const dotenv = require('dotenv');
const doctorRoutes = require('./routes/doctorRoutes');
const eventRoutes = require('./routes/eventRoutes');
const healthRecordRoutes = require("./routes/healthRecordRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const bookAppointmentRoutes = require('./routes/bookAppointmentRoutes');
const chatBotRoutes = require('./routes/chatBotRoutes');



dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(
  session({ secret: 'your_secret', resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { ...profile, accessToken }); // Pass access token along with user profile
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Google OAuth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.events', 'https://www.googleapis.com/auth/gmail.send', // Required for sending emails
      'https://www.googleapis.com/auth/gmail.compose',
      'https://www.googleapis.com/auth/gmail.modify', // Optional, for email modifications
    ]
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(
      `http://localhost:5173?token=${req.user.accessToken}&name=${encodeURIComponent(
        req.user.displayName
      )}&email=${encodeURIComponent(req.user.emails[0].value)}&picture=${encodeURIComponent(
        req.user.photos[0].value
      )}`
    );
    ;
  }
);

// API Routes
app.use('/api', doctorRoutes); //Use the doctorRoutes module
app.use('/api', eventRoutes); // Use the eventRoutes module //not using cuurently maybe
app.use("/api/health-records", healthRecordRoutes); // Use the healthRecordRoutes module
app.use('/api', prescriptionRoutes); // Use the prescriptionRoutes module
app.use('/api/bookAppointment', bookAppointmentRoutes); //use the bookAppointmentRoutes module
app.use('/api/chat-bot', chatBotRoutes); //Use the chatBotRoutes module

// Default Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
