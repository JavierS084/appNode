const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport')


router.get('/users/signin', (req, res) => {

    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true

}));

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

//route for error page
router.get("/error", function(req, res, next) {
res.render("error", {
    error: req.flash("error"),
});
});

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    const errors = [];
    if(name.length <= 0 ){
        errors.push({text: 'Please insert your name'});
    }

    if(email.length <= 0 ){
        errors.push({text: 'Please insert your email'});
    }
    if(password.length <= 0){
        errors.push({text: 'please insert your password'})
    }
    if(password != confirm_password){
        errors.push({text: 'Password do not match'});

    }
    if (password.length < 4){
        errors.push({text: 'Password must be at least 4 characters '})
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email ,password, confirm_password});
    }else{
       const emailUser = await User.findOne({email: email});
       if(emailUser) {
           req.flash('error_msg', 'The email is already in use');
           res.redirect('/users/signup');
       }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password); 
        await newUser.save();
        req.flash('succes_msg', 'You are registred');
        res.redirect('/users/signin');
    }
});

module.exports = router;
