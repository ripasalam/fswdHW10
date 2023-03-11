const auth = require('../model/userModel')


exports.create = async function (data){
    return auth.create(data)
}

exports.find = async function(keyword, value){
   
    return auth.findBy(keyword, value);
}