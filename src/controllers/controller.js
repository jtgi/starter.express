const model = require('../models/model');
const HttpException = require('../http/HttpException');
const asyncMiddleware = require('../middlewares/asyncMiddleware');
const validate = require('../middlewares/validatorMiddleware');
const logger = require('../util/logger');

const { check } = require('express-validator');
const express = require('express');
const router = express.Router();

router.get(
  '/resources',
  asyncMiddleware(async (req, res) => {
    const data = await model.list();
    return res.json(data);
  })
);

router.post(
  '/resources',
  [
    check('id')
      .isString()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('must not be empty')
  ],
  validate,
  asyncMiddleware(async (req, res) => {
    const { id } = req.body;
    const data = await model.create(id);
    return res.status(201).send(data);
  })
);

router.get(
  '/resources/:id',
  asyncMiddleware(async (req, res) => {
    const id = req.params.id;
    const data = await model.fetch(id);

    if (!data) {
      throw new HttpException(404, 'Could not find user');
    }

    return res.json(data);
  })
);

module.exports = router;
