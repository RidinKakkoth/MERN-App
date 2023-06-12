require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const adminRoute=require("./routes/admin")
const cors = require('cors');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());
// Use the cors middleware and configure it
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.urlencoded({extended:false}))

app.use(cors({
  origin:["http://localhost:3000"],
  methods:['GET','POST'],
  credentials:true
}))

const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.use(express.json());

// Routes
app.use('/', userRoute);

app.use("/admin",adminRoute)

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to the database');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
  });
