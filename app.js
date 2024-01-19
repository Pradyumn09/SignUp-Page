const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UserDetails', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { name, phoneNumber, email, newUsername, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const newUser = new User({
    name,
    phoneNumber,
    email,
    username: newUsername,
    password: hashedPassword,
  });

  try {
  const savedUser = await newUser.save();
  console.log('User saved:', savedUser);
  // Handle success if needed
  const response = {
    ok:true,
    success: true,
    message: 'User signed up successfully!'
  };
  res.status(200).json(response);
} catch (error) {
  console.error('Error saving user:', error);
  // Handle error if needed
}
});


// Login Route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Login successful
      res.send('Login successful!');
    } else {
      // Invalid credentials
      res.status(401).send('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
