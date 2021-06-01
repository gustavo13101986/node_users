const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const { Schema } = mongoose

const saltRounds = 10;

const userSchema = new Schema({
    correo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true },

})

userSchema.pre('save', (next) => {
    if(this.isNew){

        const document = this;

        bcrypt.hash(document.password, saltRounds, function(err, hash) {
            if(err){
                next(err)
            }else{
                document.password = hash
                next()
            }
        });
    }else{
        next()
    }
})

userSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, res){
        if(err){
            callback(err)
        }else{
            callback(err, res)
        }
    })
}

module.exports = mongoose.model('User', userSchema)