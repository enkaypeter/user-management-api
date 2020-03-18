const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const router = express.Router();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

let users = [];

router.get('/', (req, res) => {
  res.status(200).send('VFG Backend');
});

router.get('/users', (req, res) => {
  res.status(200).send(users);
});

router.get('/users/:id', (req, res) => {
  const record = users.find(user => parseInt(req.params.id, 10) === user.id);
  res.status(200).send(record);
});


router.delete('/users/:id', (req, res) => {
  users = users.filter(user => parseInt(req.params.id, 10) !== user.id);
  res.status(200).send(req.params.id);
});

router.post('/users', (req, res) => {
  const payload = {
    id: Date.now(),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    gender: req.body.gender,
    age: req.body.age,
    email: req.body.email,
    phone_number: req.body.phone_number,
    country: req.body.country,
    city: req.body.city,
    about: req.body.about,
    skills: req.body.skills,
    username: req.body.username,
    password: req.body.password,
    created_at: new Date().toString(),
    updated_at: null
  };

  users.push(payload);

  res.status(200).send(payload);
});

router.put('/users/:id', (req, res) => {
  const userIndex = users.findIndex((obj => obj.id === req.params.id));

  res.status(200).send(users[userIndex]);
});

app.use('/', router);

const port = process.env.PORT || 8001;
// start server on defined port based on environment
app.listen(port);

console.log(`Yo! we are live on ${port}`);
