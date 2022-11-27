const express = require('express');
const { getAllQuotes, getQuoteByID, addQuote, updateQuote, deleteQuote } = require('../controllers/quotes.controller');
const { getUserByID } = require('../controllers/user.controller');
const { requireSignIn, isAuth } = require('../utils/authentication');
const { isContentCreator } = require('../utils/authorization');


const router = express.Router();

//GET - to retrieve data
router.get('/:userID/quotes', requireSignIn, isAuth, getAllQuotes);

router.get('/:userID/quotes/:quoteID', requireSignIn, isAuth, getQuoteByID );

//POST - to insert data
router.post('/:userID/quotes', requireSignIn, isAuth,isContentCreator, addQuote);

//PUT - to update data
router.put('/:userID/quotes/:quoteID',requireSignIn, isAuth, isContentCreator, updateQuote);

//DELETE - to delete data
router.delete('/:userID/quotes/:quoteID',requireSignIn, isAuth, isContentCreator, deleteQuote);

router.param('userID', getUserByID);



module.exports = router;