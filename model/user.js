const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email)=>{
    if(!email){
        return false;
    } else {
        if(email.length < 5 || email.length > 30){
            return false;
        }else{
            return true
        }
    }
};

/*
let validEmailChecker = (email)=>{
    if(!email){
        return false;
    }else{
        const reqExp = new RegExp( Get it  from the NET );
    }
};*/

const emailValidators = [
    {
        validator: emailLengthChecker, 
        message:"Email must be more than 5 but less than 30"
    }
];

//----FOR THE USERNAME

let usernameLengthChecker = (username)=>{
    if(!username){
        return false;
    }else{
        if(username.length < 3 || username.length > 15){
            return false;
        }else{
            return true;
        }
    }
}
let validUsername = (username)=>{
    if(!username){
        return false;
    }else{
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username)
    }
};

const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: "Username must be more than 3 and less than 15 characters"
    },
    {
        validator: validUsername,
        message: "Username must be valid"
    }
];

//-----FOR THE PASSWORD
let passwordLengthChecker = (password)=>{
    if(!password){
        return false;
    }else{
        if(password < 8 || password.length > 35){
            return false;
        }else{
            return true;
        }
    }
}


const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: "Length of the password should be more than 8 but less than 35"
    }
]
const userSchema = new Schema({
    email: {type: String, required: true, unique: true, validate: emailValidators, lowercase: true },
    username: {type: String, required: true, unique: true, validate: usernameValidators, lowercase: true}, 
    password: {type: String, required: true, validate: passwordValidators}
});

userSchema.pre('save', function(next) {
    if(!this.isModified('password')){
        return(next);
    }

    bcrypt.hash(this.password, null, null, (err, hash)=>{
        if(err) return next(err)
        this.password = hash;
        next();
    });
});


userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('User', userSchema);