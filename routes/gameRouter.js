const express = require('express');

const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/start', gameController.start_get);
router.post('/validate/:id', gameController.validate_post);
router.post('/end/:id', gameController.end_post);
router.get('/leaderboard', gameController.leaderboard_get);
router.post('/character', gameController.character_post);

module.exports = router;
