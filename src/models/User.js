const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    date: {type: Date, default: Date.now}
});

/*
UserSchema.method.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;

};
*/

UserSchema.method('encryptPassword', async function(password){
    return await  bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);

})

UserSchema.method('validPassword', async function(password) {
    return await bcrypt.compareSync(password, this.password);
});

/*
UserSchema.method.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
};*/


module.exports = mongoose.model('User', UserSchema);