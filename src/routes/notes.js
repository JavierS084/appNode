const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Please Write a Title'});
    }


    if(!description) {
        errors.push({text: 'Please Write a Description'});

    }

    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description

        });
    } else {
        const newNote = new Note({ title, description});
        console.log(newNote);
        res.send('Ok');
    }
    
   
});

router.get('/notes', (req, res) => {
    res.render('');
});


module.exports = router;