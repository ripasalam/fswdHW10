const authRepository = require('../repositories/authRepository')

exports.create = async function(data){
    return authRepository.create(data)
}

exports.find = async function(keyword, value){
    
    return authRepository.find(keyword, value)
}