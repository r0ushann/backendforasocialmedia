const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')

dotenv.config()


const app = express();

/* connection string for mongoose connection */
// const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

//middlewares-> /api/.../
app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
//
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.get('/', (req, res) => {
    res.send("welcome to the home page");
})

app.get('/users', (req, res) => {
    res.send("welcome to the users page");
})


const port = 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})