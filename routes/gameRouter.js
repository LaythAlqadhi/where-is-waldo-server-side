var express = require('express');
var router = express.Router();

const game_controller = require('../controllers/gameController');

router.get('/start', game_controller.start_get);
router.post('/validate/:id', game_controller.validate_post);
router.post('/end/:id', game_controller.end_post);
router.get('/leaderboard', game_controller.leaderboard_get);
router.post('/character', game_controller.character_post);

module.exports = router;
