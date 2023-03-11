const User = require('../model/userModel')

exports.findAll = async function(){
    return User.findAll()
}
exports.find = async function(keyword, value){
   
    return User.findBy(keyword, value);
}

exports.create = async function(data) {
    return User.create(data)
}

exports.update = async function(data){
    return User.update(data)
}

exports.delete = async function(id){

    return User.delete(id)
}