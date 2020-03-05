const userService = require('../models/user');
const HttpException = require('../http/HttpException');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const authorizeMiddleware = require('../middlewares/authorizeMiddleware');
const logger = require('../util/logger');

const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.get(
  '/users',
  asyncMiddleware(async (req, res) => {
    const users = await userService.getUsers();
    return res.json(users);
  })
);

router.post(
  '/users',
  [
    check('username')
      .isString()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('must not be empty'),
    check('password')
      .isString()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('must not be empty')
  ],
  validatorMiddleware,
  asyncMiddleware(async (req, res) => {
    const { username, password } = req.body;
    const newUser = await userService.createUser(username, password);
    return res.status(201).send(newUser);
  })
);

router.post(
  '/users/login',
  [
    check('username')
      .isString()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('must not be empty'),
    check('password')
      .isString()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('must not be empty')
  ],
  validatorMiddleware,
  asyncMiddleware(async (req, res) => {
    const { username, password } = req.body;
    const updatedUser = await userService.login(username, password);

    res.status(200).json(updatedUser);
  })
);

router.post(
  '/users/:username',
  authorizeMiddleware,
  asyncMiddleware(async (req, res) => {
    const userData = req.body;
    const username = req.params.username;

    const user = await userService.getUser(username);
    if (!user) {
      return res.status(404).send();
    }

    const updatedUser = { ...user, ...userData };
    await updateUser(username, updatedUser);

    return res.json(updatedUser);
  })
);

router.get(
  '/users/:username',
  authorizeMiddleware,
  asyncMiddleware(async (req, res) => {
    const username = req.params.username;
    const user = await userService.getUser(username);

    if (!user) {
      throw new HttpException(404, 'Could not find user');
    }

    return res.json(user);
  })
);

router.get(
  '/users/:username/following',
  asyncMiddleware(async (req, res) => {
    const username = req.params.username;
    const user = await userService.getUser(username);

    if (!user) {
      return res.status(404).send();
    }

    const following = await userSerivce.getUsers(user.following);
    return res.json(following);
  })
);

router.post(
  '/users/:username/following',
  asyncMiddleware(async (req, res) => {
    const username = req.params.username;
    const usernameToFollow = req.body.username;

    await userService.createFollowing(username, usernameToFollow);
    return res.status(201).send();
  })
);

router.get(
  '/users/:username/followers',
  asyncMiddleware(async (req, res) => {
    const username = req.params.username;
    const user = await userService.getUser(username);

    if (!user) {
      return res.status(404).send();
    }

    const followers = await userService.getUsers(user.followers);
    return res.json(followers);
  })
);

module.exports = router;
