const express = require('express');
const { getAllQuotes, getQuoteByID, addQuote, updateQuote, deleteQuote } = require('../controllers/quotes.controller');


const router = express.Router();

//GET - to retrieve data
router.get('/quotes', getAllQuotes);

router.get('/quotes/:quoteID', getQuoteByID );

//POST - to insert data
router.post('/quotes', addQuote);

//PUT - to update data
router.put('/quotes/:quoteID', updateQuote);

//DELETE - to delete data
router.delete('/quotes/:quoteID', deleteQuote);



module.exports = router;