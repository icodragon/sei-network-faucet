const express = require('express');
const api = require('./controllers/api');
const cors = require('cors');

const mainRouter = new express.Router();
mainRouter.use(cors());
mainRouter.use(express.json());
mainRouter.use(express.urlencoded({ extended: true }));

mainRouter.post('/claimTokens', api.claimTokens);

exports.mainRouter = mainRouter;