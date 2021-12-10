const passport = require('passport');
const localStrategy = require('passport-local');


const User = require('../models/User')

passport.use(new localStrategy({
    usernameField: 'email'

}, async (email, password, done) => {
    const user = await User.findOne({email: email});
    if (!user){
        return done(null, false, {message: 'Not User Found'});

    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);

        }else{
            return done(null, false, {message: 'Incorrect password'});
        }
    }
}));

passport.serializeUser((user, done) => { 
    done.apply(null, user.id);

});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})