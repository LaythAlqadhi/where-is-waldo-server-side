const express = require("express");
const mongoose = require('mongoose');
const request = require('supertest');
const initializeMongoServer = require('../db/mongoConfigTesting');
const gameRouter = require('../routes/gameRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', gameRouter);

beforeAll(async () => {
  await initializeMongoServer();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Test game routes', () => {
  let id;
  
  test("character route should add a new character", done => {
    request(app)
      .post("/character")
      .send({ name: "Character", coordinates: { x: 50, y: 50 } })
      .expect(200, done);
  });
  
  test("start route should initiate a new game", done => {
    request(app)
      .get("/start")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        
        id = res.body.id;
        
        done();
      });
  });

  test("validate route should validate character coordinates", done => {
    request(app)
      .post(`/validate/${id}`)
      .send({ name: "Character", coordinates: { x: 50, y: 50 } })
      .expect(200, done);
  });

  test("end route should end the game or update the name based on conditions", done => {
    request(app)
      .post(`/end/${id}`)
      .send({ name: "John Doe" })
      .expect(200, done);
  });

  test("leaderboard route should retrieve the leaderboard", done => {
    request(app)
      .get("/leaderboard")
      .expect(200, done);
  });
});
