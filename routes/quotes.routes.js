const express = require('express');
const { getAllQuotes, getQuoteByID, addQuote, updateQuote, deleteQuote } = require('../controllers/quotes.controller');
const { requireSignIn, isAuth } = require('../utils/authentication');


const router = express.Router();

//GET - to retrieve data
router.get('/:userID/quotes', requireSignIn, isAuth, getAllQuotes);

router.get('/:userID/quotes/:quoteID', requireSignIn, isAuth, getQuoteByID );

//POST - to insert data
router.post('/:userID/quotes', requireSignIn, isAuth, addQuote);

//PUT - to update data
router.put('/:userID/quotes/:quoteID',requireSignIn, isAuth, updateQuote);

//DELETE - to delete data
router.delete('/:userID/quotes/:quoteID',requireSignIn, isAuth, deleteQuote);



module.exports = router;