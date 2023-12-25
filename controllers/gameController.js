const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Game = require('../models/game');
const Character = require('../models/character');

exports.start_get = asyncHandler(async (req, res, next) => {
  await Game.deleteMany({ name: { $exists: false } });

  const characters = await Character.find({}, { _id: 0 });

  const game = new Game({ characters });

  await game.save();

  res.status(200).json({
    id: game.id,
    characters: game.characters,
  });
});

exports.validate_post = [
  body('name').trim().notEmpty().escape(),
  body('coordinates.x').notEmpty().isNumeric(),
  body('coordinates.y').notEmpty().isNumeric(),

  asyncHandler(async (req, res, next) => {
    const { name, coordinates } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.sendStatus(404);
    }

    const character = game.characters.find((c) => c.name === name);

    if (character) {
      const { x, y } = character.coordinates;
      const { x: reqX, y: reqY } = coordinates;

      if (Math.abs(x - reqX) <= 4 && Math.abs(y - reqY) <= 4) {
        const updatedCharacters = game.characters.filter(
          (c) => c.name !== name,
        );
        game.characters = updatedCharacters;

        if (game.characters.length === 0) {
          await game.save();

          return res.status(200).json({
            message: 'Congratulations! You Win!',
            characters: updatedCharacters,
          });
        }
        await game.save();

        return res.status(200).json({
          message: 'Nice job! Character found.',
          characters: updatedCharacters,
        });
      }
      return res.status(200).json({ message: 'Oops! Wrong coordinates.' });
    }
    return res.sendStatus(403);
  }),
];

exports.end_post = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 25 })
    .withMessage('Name must be at least 25 characters')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (name) {
      const game = await Game.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name,
          },
          $unset: { characters: 1 },
        },
        { new: true },
      );

      if (game) {
        return res.sendStatus(200);
      }
      return res.sendStatus(403);
    }
    await Game.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  }),
];

exports.leaderboard_get = asyncHandler(async (req, res, next) => {
  await Game.deleteMany({ name: { $exists: false } });

  const game = await Game.find({}, { _id: 0 }).sort({ elapsedTime: 1 }).exec();

  res.status(200).json(game);
});

exports.character_post = [
  body('name').trim().notEmpty().escape(),
  body('coordinates.x').notEmpty().isNumeric(),
  body('coordinates.y').notEmpty().isNumeric(),

  asyncHandler(async (req, res, next) => {
    const { name, coordinates } = req.body;

    const errors = validationResult(req);

    const character = new Character({
      name,
      coordinates: {
        x: coordinates.x,
        y: coordinates.y,
      },
    });

    if (!errors.isEmpty()) {
      res.json({ errors: errors.array() });
      return;
    }
    await character.save();
    res.status(200).json(character);
  }),
];
