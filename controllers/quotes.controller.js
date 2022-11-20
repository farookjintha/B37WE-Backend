const Quotes = require('../models/quotes.model');


exports.getAllQuotes = (req, res) => {
    try{
        Quotes.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving quotes.'})
            }
    
            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.getQuoteByID = (req, res) => {
    try{
        Quotes.findOne({_id: req.params.quoteID},(err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while retrieving quote.'})
            }
    
            res.status(200).send(data);
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
}

exports.addQuote =  async (req, res) => {
    try{
        const payload = req.body;

        const newQuote = new Quotes(payload);

        newQuote.save((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while adding a quote.'})
            }
    
            res.status(200).send({message: 'Quote has been added successfully'});
        });

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.updateQuote = (req, res) => {
    try{
        const payload = req.body;

        Quotes.findByIdAndUpdate({_id: req.params.quoteID}, {$set: payload}, (err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while updating a quote.'})
            }
    
            res.status(200).send(data);
        })

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
}

exports.deleteQuote = (req, res) => {
    try{
        Quotes.deleteOne({_id: req.params.quoteID}, (err, data) => {
            if(err){
                return res.status(400).send({message : 'Error while deleting a quote.'})
            }

            res.status(200).send({message: 'Quote has been deleted successfully.'})
        })
    }catch(error){
        res.status(500).send({message : 'Internal Server Error'});
    }
}