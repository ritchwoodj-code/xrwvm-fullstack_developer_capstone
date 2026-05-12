// Local-only Express server: serves from JSON files (no Mongo).
// Used for local screenshots; the real shipped app.js (Mongo) is unchanged.
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

const reviewsPath = path.join(__dirname, 'data', 'reviews.json');
const dealersPath = path.join(__dirname, 'data', 'dealerships.json');

let reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8')).reviews;
let dealers = JSON.parse(fs.readFileSync(dealersPath, 'utf8')).dealerships;

app.get('/', (req, res) => res.send('Welcome to the Mongoose API (local)'));

app.get('/fetchReviews', (req, res) => res.json(reviews));
app.get('/fetchReviews/dealer/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.json(reviews.filter(r => r.dealership === id));
});

app.get('/fetchDealers', (req, res) => res.json(dealers));
app.get('/fetchDealers/:state', (req, res) => {
  res.json(dealers.filter(d => d.state === req.params.state));
});
app.get('/fetchDealer/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.json(dealers.filter(d => d.id === id));
});

app.post('/insert_review', express.raw({ type: '*/*' }), (req, res) => {
  const data = JSON.parse(req.body);
  const newId = Math.max(...reviews.map(r => r.id || 0)) + 1;
  const review = {
    id: newId,
    name: data.name,
    dealership: data.dealership,
    review: data.review,
    purchase: data.purchase,
    purchase_date: data.purchase_date,
    car_make: data.car_make,
    car_model: data.car_model,
    car_year: data.car_year,
    sentiment: 'positive',
  };
  reviews.push(review);
  res.json(review);
});

app.listen(port, () => console.log(`Local Express on http://localhost:${port}`));
